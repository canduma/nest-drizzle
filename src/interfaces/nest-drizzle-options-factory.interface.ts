import { NestDrizzleOptions } from './nest-drizzle-options.interface';

export interface NestDrizzleOptionsFactory {
  createNestDrizzleOptions(): Promise<NestDrizzleOptions> | NestDrizzleOptions;
}
