import { DrizzleConfig } from 'drizzle-orm';
import { MigrationConfig } from 'drizzle-orm/migrator';
import { MySql2DrizzleConfig } from 'drizzle-orm/mysql2';

export interface NestDrizzleOptions {
  driver:
    | 'postgres-js'
    | 'mysql2'
    | 'supabase'
    | 'neon'
    | 'planetscale'
    | 'sqlite3';
  url: string;
  options?: DrizzleConfig<Record<string, unknown>>;
  mysql2Options?: MySql2DrizzleConfig<Record<string, unknown>>;
  migrationOptions?: MigrationConfig;
}
