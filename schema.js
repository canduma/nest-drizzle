"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.user = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id"),
    name: (0, pg_core_1.text)("name"),
    email: (0, pg_core_1.text)("email"),
    password: (0, pg_core_1.text)("password"),
    role: (0, pg_core_1.text)("role").$type(),
    createdAt: (0, pg_core_1.timestamp)("created_at"),
    updatedAt: (0, pg_core_1.timestamp)("updated_at"),
});
