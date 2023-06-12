import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { NestDrizzleService } from './nest-drizzle.service';
import {
  NEST_DRIZZLE_OPTIONS,
} from './constants';
import {
  NestDrizzleOptions,
  NestDrizzleAsyncOptions,
  NestDrizzleOptionsFactory,
} from './interfaces';

import { createNestDrizzleProviders } from './nest-drizzle.providers';
import { connectionFactory } from './nest-drizzle-connection.provider';


@Global()
@Module({
  providers: [NestDrizzleService, connectionFactory],
  exports: [NestDrizzleService, connectionFactory],
})
export class NestDrizzleModule {
  /**
   * Registers a configured NestDrizzle Module for import into the current module
   */
  public static register(
    options: NestDrizzleOptions,
  ): DynamicModule {
    return {
      module: NestDrizzleModule,
      providers: createNestDrizzleProviders(options),
    };
  }

  /**
   * Registers a configured NestDrizzle Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static registerAsync(
    options: NestDrizzleAsyncOptions,
  ): DynamicModule {
    return {
      module: NestDrizzleModule,
      providers: [
        ...this.createProviders(options),
      ],
    };
  }

  private static createProviders(
    options: NestDrizzleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: NestDrizzleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_DRIZZLE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
  provide: NEST_DRIZZLE_OPTIONS,
      useFactory: async (optionsFactory: NestDrizzleOptionsFactory) =>
        await optionsFactory.createNestDrizzleOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

 }
