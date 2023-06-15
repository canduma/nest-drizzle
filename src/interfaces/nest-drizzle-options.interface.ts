import { DrizzleConfig } from 'drizzle-orm';
import { MigrationConfig } from 'drizzle-orm/migrator';

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
  migrationOptions?: MigrationConfig;
}
