// tslint:disable: variable-name
import { Injectable, Inject } from '@nestjs/common';
import { NEST_DRIZZLE_OPTIONS} from './constants';
import { NestDrizzleOptions } from './interfaces';
import { PostgresJsDatabase, drizzle as drizzlePgJs  } from "drizzle-orm/postgres-js";
import { drizzle as drizzleMysql2, MySql2Client, MySql2Database} from "drizzle-orm/mysql2";
import { drizzle as drizzleSqLite, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as postgres from 'postgres';
import * as mysql from "mysql2/promise";
import * as BetterSqlite3 from 'better-sqlite3';

interface INestDrizzleService {
  migrate(): Promise<void>;
  getDrizzle(): Promise<MySql2Database | PostgresJsDatabase | BetterSQLite3Database>;
}

@Injectable()
export class NestDrizzleService implements INestDrizzleService {
  private _drizzle;
  constructor(
    @Inject(NEST_DRIZZLE_OPTIONS) private _NestDrizzleOptions: NestDrizzleOptions,
  ) {}
  test(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async migrate() {
    //migrate(drizzlePgJs(this._NestDrizzleOptions.migrationClient), { migrationsFolder: './drizzle' })
  }
  async getDrizzle() {
    let client: postgres.Sql<{}> | MySql2Client | BetterSqlite3.Database;
    if (!this._drizzle) {
      switch(this._NestDrizzleOptions.driver) {
        case 'postgres-js' || 'supabase' || 'neon':
          client = postgres(this._NestDrizzleOptions.url);
          this._drizzle = drizzlePgJs(client, this._NestDrizzleOptions.options);
          break;
          case 'mysql2' || 'planetscale':
            client = await mysql.createConnection(this._NestDrizzleOptions.url);
            this._drizzle = drizzleMysql2(client, this._NestDrizzleOptions.options);
            break;
            case 'sqlite3':
              client = new BetterSqlite3(this._NestDrizzleOptions.url);
              this._drizzle = drizzleSqLite(client, this._NestDrizzleOptions.options);
              break;  
        default:
          throw new Error(`This Drizzle driver don't exist`);
      }
    }
    return this._drizzle as typeof this._drizzle;
  }
}