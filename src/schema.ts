import { relations } from 'drizzle-orm';
import { serial, text, timestamp, pgTable, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email'),
  password: text('password'),
  role: text('role').$type<'admin' | 'customer'>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const usersRelations = relations(user, ({ many }) => ({
  books: many(books),
}));

export const books = pgTable('books', {
  id: serial('id'),
  name: text('name'),
  userId: integer('user_id').references(() => user.id),
});

export const bookssRelations = relations(books, ({ one }) => ({
  author: one(user, { fields: [books.userId], references: [user.id] }),
}));
