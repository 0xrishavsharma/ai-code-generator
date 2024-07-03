// id
// name
// createdBy
// createdAt

import { sql } from "drizzle-orm"
import { text, sqliteTable } from "drizzle-orm/sqlite-core"
import { user } from "./user"

export const chat = sqliteTable("chat", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})
