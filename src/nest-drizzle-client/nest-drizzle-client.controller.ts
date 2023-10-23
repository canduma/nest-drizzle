import { Controller, Get, Inject } from '@nestjs/common';
import { PostgresJsDb, DRIZZLE_ORM } from '../';
import { books } from '../schema';

@Controller()
export class NestDrizzleClientController {
  constructor(@Inject(DRIZZLE_ORM) private readonly db: PostgresJsDb) {}

  @Get()
  async index() {
    const allUsers = await this.db.select({name: books.name}).from(books)
    return allUsers;
  }
}
