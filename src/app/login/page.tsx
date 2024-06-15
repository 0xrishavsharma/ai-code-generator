"use client"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { FaGoogle } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setUser } from "@/state/user/userSlice"
import { useRouter } from "next/navigation"

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: session } = useSession()

  useEffect(() => {
    session && router.replace("/")
    if (session && session.user) {
      const userData = {
        id: session.user.id,
        name: session.user.name,
        isLoggedIn: true,
        avatar: session.user.image,
        email: session.user.email,
        expiresAt: new Date(session.expires),
      }
      dispatch(setUser(userData)) // Dispatch action to store user data
    }
  }, [session, dispatch])

  console.log

  const handleSignIn = async (e: any, method: string) => {
    e.preventDefault()
    const res = await signIn(method, { callbackUrl: "/" })
    console.log("Signin Response", res)
  }
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center">
      <h1 className="mb-12 text-3xl font-bold">Login</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={(e) => handleSignIn(e, "google")}
          className="max-w-max px-6 py-2 text-lg font-medium bg-blue-400 rounded-sm border-[0.25px] border-white/80"
        >
          <FaGoogle className="inline-block mr-2" />
          Login with Google
        </button>
        <button
          onClick={(e) => handleSignIn(e, "github")}
          className="max-w-max px-6 py-2 text-lg font-medium bg-gray-700 border-[0.25px] border-white/40 rounded-sm"
        >
          <FaGithub className="inline-block mr-2" />
          Login with GitHub
        </button>
      </div>
    </div>
  )
}
export default Login
