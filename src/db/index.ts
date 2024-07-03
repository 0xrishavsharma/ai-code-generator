import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import env from "@/lib/env"

const client = createClient({
  url: `${env.TURSO_URL}`,
  authToken: `${env.TURSO_AUTH_TOKEN}`,
})

export const db = drizzle(client)