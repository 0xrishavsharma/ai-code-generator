import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

// log all the environment variables
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID)
console.log(process.env.NEXT_PUBLIC_GOOGLE_ClIENT_SECRET)
console.log(process.env.NEXT_PUBLIC_GITHUB_ClIENT_ID)
console.log(process.env.NEXT_PUBLIC_GITHUB_ClIENT_SECRET)

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
})

export { handlers, signOut, signIn, auth }
