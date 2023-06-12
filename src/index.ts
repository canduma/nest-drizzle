import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { MySql2Database } from 'drizzle-orm/mysql2';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export * from './nest-drizzle.service';
export * from './nest-drizzle.module';
export * from './interfaces';
export * from './constants';

export type MySql2Db = MySql2Database;
export type SQLite3Db = BetterSQLite3Database;
export type PostgresJsDb = PostgresJsDatabase;
