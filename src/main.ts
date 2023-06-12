/**
 *  If you're building a standalone npm package hosting a dynamic module, you
 *  should delete this file.  Its only purpose is to bootstrap the app so that
 *  you can run the quick verification test (see nest-drizzle-client/nest-drizzle-client.module.ts)
 */
import { NestFactory } from '@nestjs/core';
import { NestDrizzleClientModule } from './nest-drizzle-client/nest-drizzle-client.module';

async function bootstrap() {
  const app = await NestFactory.create(NestDrizzleClientModule);
  await app.listen(3000);
}
bootstrap();
