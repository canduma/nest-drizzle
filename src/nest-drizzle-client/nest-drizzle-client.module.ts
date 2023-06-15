import { Module } from '@nestjs/common';
import { NestDrizzleClientController } from './nest-drizzle-client.controller';
import { NestDrizzleModule } from '../';
import * as schema from '../schema';

@Module({
  controllers: [NestDrizzleClientController],
  imports: [
    NestDrizzleModule.forRootAsync({
      useFactory: () => {
        return {
          driver: 'postgres-js',
          url: 'postgres://user:admin@localhost:54320/nestdrizzle',
          options: { schema },
          migrationOptions: { migrationsFolder: './drizzle' },
        };
      },
    }),
  ],
})
export class NestDrizzleClientModule {}
