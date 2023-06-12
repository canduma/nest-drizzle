import { Controller, Get, Inject } from '@nestjs/common';
import { user } from '../../schema';
import { PostgresJsDb, DRIZZLE_ORM } from '@ockonor/nest-drizzle';

@Controller()
export class NestDrizzleClientController {
  constructor(@Inject(DRIZZLE_ORM) private readonly db: PostgresJsDb) {}

  @Get()
  async index() {
    const allUsers = await this.db.select().from(user);
    return allUsers;
  }
}
