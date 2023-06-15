<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" /></a>
    <a href="#">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/500px-Plus_symbol.svg.png" alt="+" width=45>
    </a>
    <a href="https://orm.drizzle.team" target="_blank">
    <img src="https://images.opencollective.com/drizzle-orm/9405e48/logo/256.png" alt="Drizzle ORM Logo" width=60>
    </a>
  </a>
</div>

<h3 align="center">NestDrizzle -- Drizzle ORM integration for NestJS</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs 9-brightgreen.svg" alt="Built with NestJS">
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

Create the drizzle-kit configuration in your project root folder
```js
// <your project root>/drizzle.config.ts
import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
} satisfies Config;
```

Create your schema in your project src folder

See [documentation here](https://orm.drizzle.team/docs/schemas)
```js
// <your project root>/src/schema.ts
import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id'),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  role: text('role').$type<'admin' | 'customer'>(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});
```
Add `generate` script in `package.json` and execute [drizzle-kit documentation here](https://orm.drizzle.team/kit-docs/overview)
```json
"scripts": {
    "start:dev": "tsc-watch -p tsconfig.build.json --onSuccess \"node dist/main.js\"",
    "build": "tsc",
    "prepare": "npm run build",
    "format": "prettier --write \"src/**/*.ts\"",
    "lint": "tslint -p tsconfig.json -c tslint.json",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:e2e": "jest --config ./test/jest-e2e.json",
  + "generate": "drizzle-kit generate:pg"
  },
```
``` bash
# Update you schema
npm run generate
```

## Configuration

### Modules

Methods: 
- `register()` 
- `registerAsync()` 
- `forRoot()` 
- `forRootAsync()`

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
### Types
Don't forget to import the good types in your `controllers/services`
```js
// if you have driver 'postgres-js'|'supabase'|'neon'
import { PostgresJsDb, DRIZZLE_ORM } from '@ockonor/nest-drizzle';
// or if you have driver 'mysql2'|'planetscale'
import { MySql2Db, DRIZZLE_ORM } from '@ockonor/nest-drizzle';
// or if you have the driver 'sqlite3'
import { SQLite3Db, DRIZZLE_ORM } from '@ockonor/nest-drizzle';

```
### Controllers / Services
See [documentation here](https://orm.drizzle.team/docs/crud)

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

## TODO

- [ ] Command for migration
- [ ] Support another serverless databases + sqlite providers
- [X] Add `forRoot` and `forRootAsync`
