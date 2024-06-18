import React from "react"
import useRequireAuth from "@/hooks/useRequireAuth"

interface Props {
  redirectTo?: string
}

const withProtectedAuth = <P extends object>(
  Component: React.ComponentType<P>,
  redirectTo = "/login",
): React.FC<P & Props> => {
  const AuthenticatedComponent: React.FC<P & Props> = (props) => {
    const session = useRequireAuth(redirectTo)

    if (!session) {
      return null
    }

    return <Component {...props} />
  }

  AuthenticatedComponent.displayName = `withProtectedAuth(${Component.displayName || Component.name || "Component"})`

  return AuthenticatedComponent
}

export default withProtectedAuth
