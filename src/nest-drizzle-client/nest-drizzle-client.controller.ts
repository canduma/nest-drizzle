import { Controller, Get, Inject } from '@nestjs/common';
import { PostgresJsDb, DRIZZLE_ORM } from '../';

@Controller()
export class NestDrizzleClientController {
  constructor(@Inject(DRIZZLE_ORM) private readonly db: PostgresJsDb) {}

  @Get()
  async index() {
    const allUsers = await this.db.query.user.findMany({
      with: { books: { columns: { name: true } } },
    });
    return allUsers;
  }
}
