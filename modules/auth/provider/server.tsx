import { PropsWithChildren } from "react"

import { AuthProviderClient } from "./client"
import { getUser } from "../get-user"

export async function AuthProvider({ children }: PropsWithChildren) {
  const user = await getUser()

  return <AuthProviderClient initialUser={user}>{children}</AuthProviderClient>
}
