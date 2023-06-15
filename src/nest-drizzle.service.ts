import { Injectable, Inject } from '@nestjs/common';
import { NEST_DRIZZLE_OPTIONS } from './constants';
import { NestDrizzleOptions } from './interfaces';
import { migrate as migratePgJs } from 'drizzle-orm/postgres-js/migrator';
import { migrate as migrateMysql2 } from 'drizzle-orm/mysql2/migrator';
import { migrate as migrateSqLite3 } from 'drizzle-orm/better-sqlite3/migrator';

import {
  PostgresJsDatabase,
  drizzle as drizzlePgJs,
} from 'drizzle-orm/postgres-js';
import {
  drizzle as drizzleMysql2,
  MySql2Client,
  MySql2Database,
} from 'drizzle-orm/mysql2';
import {
  drizzle as drizzleSqLite,
  BetterSQLite3Database,
} from 'drizzle-orm/better-sqlite3';
import * as postgres from 'postgres';
import * as mysql from 'mysql2/promise';
import * as BetterSqlite3 from 'better-sqlite3';

interface INestDrizzleService {
  migrate(): Promise<void>;
  getDrizzle(): Promise<
    MySql2Database | PostgresJsDatabase | BetterSQLite3Database
  >;
}

@Injectable()
export class NestDrizzleService implements INestDrizzleService {
  private _drizzle;
  constructor(
    @Inject(NEST_DRIZZLE_OPTIONS)
    private _NestDrizzleOptions: NestDrizzleOptions,
  ) {}
  test(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async migrate() {
    let client:
      | postgres.Sql<Record<string, never>>
      | MySql2Database<Record<string, never>>
      | BetterSQLite3Database<Record<string, never>>;
    switch (this._NestDrizzleOptions.driver) {
      case 'postgres-js' || 'supabase' || 'neon':
        client = postgres(this._NestDrizzleOptions.url, { max: 1 });
        await migratePgJs(
          drizzlePgJs(client),
          this._NestDrizzleOptions.migrationOptions,
        );
        break;
      case 'mysql2' || 'planetscale':
        const pool = mysql.createPool(this._NestDrizzleOptions.url);
        client = drizzleMysql2(pool);
        await migrateMysql2(client, this._NestDrizzleOptions.migrationOptions);
        break;
      case 'sqlite3':
        const db = new BetterSqlite3(this._NestDrizzleOptions.url);
        client = drizzleSqLite(db, this._NestDrizzleOptions.options);
        migrateSqLite3(client, this._NestDrizzleOptions.migrationOptions);
        break;
      default:
        throw new Error(`This Drizzle driver don't exist`);
    }
    // migrate(drizzlePgJs(this._NestDrizzleOptions.migrationClient), { migrationsFolder: './drizzle' })
  }
  async getDrizzle() {
    let client:
      | postgres.Sql<Record<string, never>>
      | MySql2Client
      | BetterSqlite3.Database;
    if (!this._drizzle) {
      switch (this._NestDrizzleOptions.driver) {
        case 'postgres-js' || 'supabase' || 'neon':
          client = postgres(this._NestDrizzleOptions.url);
          this._drizzle = drizzlePgJs(client, this._NestDrizzleOptions.options);
          break;
        case 'mysql2' || 'planetscale':
          client = await mysql.createConnection(this._NestDrizzleOptions.url);
          this._drizzle = drizzleMysql2(
            client,
            this._NestDrizzleOptions.options,
          );
          break;
        case 'sqlite3':
          client = new BetterSqlite3(this._NestDrizzleOptions.url);
          this._drizzle = drizzleSqLite(
            client,
            this._NestDrizzleOptions.options,
          );
          break;
        default:
          throw new Error(`This Drizzle driver don't exist`);
      }
    }
    return this._drizzle;
  }
}
