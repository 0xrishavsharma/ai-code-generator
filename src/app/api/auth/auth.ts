import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

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
  // callbacks: {
  //   async jwt({ token, user, account }) {
  //     // If the user object exists, it means this is the first time the JWT callback is being executed after the user has logged in
  //     if (user) {
  //       // You can add more properties from the user object or the account object provided by the provider
  //       token.user = {
  //         id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         image: user.image,
  //         // Add any other properties provided by the authentication provider
  //       }
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     // Assign the user details from the JWT token to the session's user object
  //     session.user = token.user
  //     return session
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handlers, signOut, signIn, auth }
