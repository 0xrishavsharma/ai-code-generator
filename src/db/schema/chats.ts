// id
// name
// createdBy
// createdAt

import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core"
const chats = sqliteTable("table", {
  id: text("id"),
})
