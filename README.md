<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png" alt="Drizzle ORM Logo" width=45>
    <img src="https://images.opencollective.com/drizzle-orm/9405e48/logo/256.png" alt="Drizzle ORM Logo" width=60>
  </a>
</div>

<h3 align="center">NestDrizzle -- Drizzle ORM integration for NestJS</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
  <a href="https://github.com/nestjsplus/dyn-schematics" target="_blank">
    <img src="https://img.shields.io/badge/Built%20with-%40nestjsplus%2Fdyn--schematics-brightgreen" alt="Built with @nestjsplus/dyn-schematics">
  </a>
</div>

This module was created to integrate [Drizzle ORM](https://orm.drizzle.team/) with [NestJS](https://nestjs.com) with all serverfull drivers:
```bash
'postgres-js' | 'mysql2' | 'supabase' | 'neon' | 'planetscale' | 'sqlite3'
```
### Installation

To install this project:

```bash
npm i @ockonor/nest-drizzle 
npm i -D drizzle-kit
```

### Configuration

```js
// in your module
import { NestDrizzleModule } from '@ockonor/nest-drizzle';

@Module({
  controllers: [NestDrizzleClientController],
  imports: [
    NestDrizzleModule.registerAsync({
      useFactory: () => {
        return {
          driver: 'postgres-js', // 'postgres-js'|'mysql2'|'supabase'|'neon'|'planetscale' |'sqlite3'
          url: 'postgres://<user>:<password>@<host>:<port>/<database>', // postgres://<user>:<password>@<host>:<port>/<database>, ./<your file>.sqlite
          ...
        };
      },
    }),
  ],
})
export class ...
```
Don't forget to import the good types in your controllers/services
```js
// if you have driver 'postgres-js'|'supabase'|'neon'
import { PostgresJsDb, DRIZZLE_ORM } from '@ockonor/nest-drizzle';
// or if you have driver 'mysql2'|'planetscale'
import { MySql2Db, DRIZZLE_ORM } from '@ockonor/nest-drizzle';
// or if you have the driver 'sqlite3'
import { SQLite3Db, DRIZZLE_ORM } from '@ockonor/nest-drizzle';

```

```js
// in your controller or service
import { Controller, Get, Inject } from '@nestjs/common';
import { user } from '../../schema';
import { PostgresJsDb, DRIZZLE_ORM } from '@ockonor/nest-drizzle';

@Controller()
export class NestDrizzleClientController {
  // private readonly db: PostgresJsDb or MySql2Db or SQLite3Db
  constructor(@Inject(DRIZZLE_ORM) private readonly db: PostgresJsDb) {}

  @Get()
  async index() {
    const allUsers = await this.db.select().from(user);
    return allUsers;
  }
}
```
