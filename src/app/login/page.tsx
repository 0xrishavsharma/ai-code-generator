"use client"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { FaGoogle } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"

const login = () => {
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center">
      <h1 className="mb-12 text-3xl font-bold">Login</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={(e) => {
            e.preventDefault()
            signIn("google")
          }}
          className="max-w-max px-6 py-2 text-lg font-medium bg-blue-400 rounded-sm border-[0.25px] border-white/80"
        >
          <FaGoogle className="inline-block mr-2" />
          Login with Google
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            signIn("github")
          }}
          className="max-w-max px-6 py-2 text-lg font-medium bg-gray-700 border-[0.25px] border-white/40 rounded-sm"
        >
          <FaGithub className="inline-block mr-2" />
          Login with GitHub
        </button>
      </div>
    </div>
  )
}
export default login
