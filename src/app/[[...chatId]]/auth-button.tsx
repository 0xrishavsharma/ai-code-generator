import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { IoIosLogOut } from "react-icons/io"

type Props = {}
const AuthButton = (props: Props) => {
  const { data: session } = useSession()
  return (
    <div className="">
      <div className="flex flex-col justify-center truncate">
        {session ? (
          <Link
            href="/"
            className="dark:bg-neutral-700  backdrop-blur hover:bg-black border-white/30 hover:border hover:border-white/45 flex items-center justify-center gap-3 px-4 py-2 text-left transition-colors border rounded-md"
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Log out
            <IoIosLogOut className="text-lg" />
          </Link>
        ) : (
          <Link
            href="/login"
            className="dark:bg-neutral-600  backdrop-blur hover:bg-black border-white/30 hover:border hover:border-white/45 flex items-center justify-center gap-3 px-4 py-2 text-left transition-colors border rounded-md"
          >
            Log In
            {/* <IoIosLogOut className="text-lg" /> */}
          </Link>
        )}
      </div>
    </div>
  )
}
export default AuthButton
