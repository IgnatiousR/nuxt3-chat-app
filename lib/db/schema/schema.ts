import * as t from 'drizzle-orm/pg-core';

export const usersTable = t.pgTable('users', {
  id: t.serial().primaryKey(),
  username: t.varchar({ length: 255 }).notNull(),
  email: t.varchar({ length: 255 }).notNull().unique(),
  password: t.varchar({ length: 255 }).notNull(),
  createdAt: t.timestamp('created_at').notNull().defaultNow(),
  updatedAt: t
    .timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});
export const messagesTable = t.pgTable('messages', {
  id: t.serial('id').primaryKey(),
  userId: t.serial('user_id').references(() => usersTable.id),
  content: t.text('content').notNull(),
  createdAt: t.timestamp('created_at').defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertMessage = typeof messagesTable.$inferInsert;
export type SelectMessage = typeof messagesTable.$inferSelect;
