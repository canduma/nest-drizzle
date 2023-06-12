import { MySql2Database } from 'drizzle-orm/mysql2';
import { DRIZZLE_ORM } from './constants';
import { NestDrizzleService } from './nest-drizzle.service';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export const connectionFactory = {
  provide: DRIZZLE_ORM,
  useFactory: async (nestDrizzleService: {
    getDrizzle: () => Promise<
      MySql2Database | PostgresJsDatabase | BetterSQLite3Database
    >;
  }) => {
    return nestDrizzleService.getDrizzle();
  },
  inject: [NestDrizzleService],
};
