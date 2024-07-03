import env from "@/lib/env"
import { Config, defineConfig } from "drizzle-kit"

export default {
  dialect: "sqlite",
  schema: "./src/db/schema/*",
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  out: "./drizzle",
} satisfies Config
