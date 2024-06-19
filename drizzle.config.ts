import env from "@/lib/env"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/db/schema/*",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  out: "./drizzle",
})
