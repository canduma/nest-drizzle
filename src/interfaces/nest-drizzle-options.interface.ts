import { DrizzleConfig } from "drizzle-orm";

export interface NestDrizzleOptions {
  driver: 'postgres-js' | 'mysql2' | 'supabase' | 'neon' | 'planetscale' | 'sqlite3'
  url: string
  options?: DrizzleConfig<Record<string, never>>
}


