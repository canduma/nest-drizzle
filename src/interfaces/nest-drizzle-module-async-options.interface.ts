/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/* Interfaces */
import { NestDrizzleOptions } from './nest-drizzle-options.interface';
import { NestDrizzleOptionsFactory } from './nest-drizzle-options-factory.interface';

export interface NestDrizzleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<NestDrizzleOptionsFactory>;
  useClass?: Type<NestDrizzleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestDrizzleOptions> | NestDrizzleOptions;
}
