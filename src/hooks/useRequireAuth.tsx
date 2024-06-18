import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

const useRequireAuth = (redirectTo = "/login") => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(redirectTo)
    }

    if (session?.user) {
      router.push("/")
    }
  }, [status, redirectTo])

  return { session, status }
}
export default useRequireAuth
