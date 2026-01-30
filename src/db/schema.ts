import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

//This is where we'll define our SQL schemas

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
});
