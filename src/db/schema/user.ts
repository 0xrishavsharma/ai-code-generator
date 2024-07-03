// id
// name
// username
// password
// role: "user" | "admin"
// createdAt

import { sql } from "drizzle-orm"
import { timestamp } from "drizzle-orm/mysql-core"
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core"
export const user = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(), // Ensure hashed
  role: text("role", { enum: ["user", "admin"] }).notNull(),
  email: text("email").notNull().unique(),
  credit_count: integer("credit_count").default(0),
  free_generation_count: integer("free_generation_count").default(0),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})
