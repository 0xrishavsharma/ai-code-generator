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
          <button
            className="bg-white/20 backdrop-blur hover:bg-black border-white/30 hover:border hover:border-white/45 flex items-center justify-center gap-3 px-4 py-2 text-left transition-colors border rounded-md"
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            {/* {session.user?.image && (
              <Image
                src={session.user.image}
                alt="User Avatar"
                className="w-6 h-6 rounded-full"
                width={32}
                height={32}
              />
            )} */}
            Log out
            <IoIosLogOut className="text-lg" />
          </button>
        ) : (
          <Link href="/login">Log in</Link>
        )}
      </div>
    </div>
  )
}
export default AuthButton
