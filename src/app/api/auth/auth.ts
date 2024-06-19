import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import env from "@/lib/env"

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
      clientSecret: env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
})

export { handlers, signOut, signIn, auth }
