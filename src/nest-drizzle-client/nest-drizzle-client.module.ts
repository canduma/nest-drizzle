/**
 *  NestDrizzleClientModule is a testing module that verifies that
 *  NestDrizzleModule was generated properly.
 *
 *  You can quickly verify this by running `npm run start:dev`, and then
 *  connecting to `http://localhost:3000` with your browser.  It should return
 *  a custom message like `Hello from NestDrizzleModule`.
 *
 *  Once you begin customizing NestDrizzleModule, you'll probably want
 *  to delete this module.
 */
import { Module } from '@nestjs/common';
import { NestDrizzleClientController } from './nest-drizzle-client.controller';
import { NestDrizzleModule } from '../nest-drizzle.module';

@Module({
  controllers: [NestDrizzleClientController],
  imports: [NestDrizzleModule.registerAsync({
    useFactory: () => {
      return {
        driver: 'postgres-js',
        url: "postgres://user:admin@localhost:54320/nestdrizzle"
      };
    },
  })],
})
export class NestDrizzleClientModule {}
