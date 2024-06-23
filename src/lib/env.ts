import { cleanEnv, port, str } from "envalid"

const env = cleanEnv(process.env, {
  // OpenAI Creds
  OPENAI_API_KEY: str(),

  // Auth Provider Creds
  NEXT_PUBLIC_GITHUB_CLIENT_ID: str(),
  NEXT_PUBLIC_GITHUB_CLIENT_SECRET: str(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: str(),
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: str(),
  NEXTAUTH_URL: str(),

  // Random secret for NextAuth.js
  NEXTAUTH_SECRET: str(),

  // Local AWS S3 Bucket Configuration
  AWS_S3_BUCKET_NAME_LOCAL: str(),
  AWS_S3_BUCKET_REGION_LOCAL: str(),
  AWS_S3_BUCKET_ACCESS_KEY_LOCAL: str(),
  AWS_S3_BUCKET_SECRET_ACCESS_KEY_LOCAL: str(),

  // MongoDB Configuration
  MONGODB_CONNECTION_PASSWORD_LOCAL: str(),
  MONGODB_CONNECTION_USERNAME_LOCAL: str(),

  // Turso Database Configuration
  TURSO_URL: str(),
  TURSO_AUTH_TOKEN: str(),
})

export default env
