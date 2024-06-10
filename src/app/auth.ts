import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ClIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_ClIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ClIENT_ID ?? "",
      clientSecret: process.env.GITHUB_ClIENT_SECRET ?? "",
    }),
  ],
})

export { handlers, signOut, signIn, auth }
