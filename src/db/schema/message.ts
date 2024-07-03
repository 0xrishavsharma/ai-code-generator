// id
// chatId
// content
// role: "user" | "assistant" | "system"
// createdAt

import { sql } from "drizzle-orm"
import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core"
import { chat } from "./chat"
import { user } from "./user"
export const message = sqliteTable("messages", {
  id: integer("id").notNull().primaryKey(),
  content: text("content").notNull(),
  chat_id: text("chat_id")
    .notNull()
    .references(() => chat.id),
  user_id: text("user_id")
    .notNull()
    .references(() => user.id),
  role: text("role", { enum: ["user", "assistant"] }).notNull(),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})
