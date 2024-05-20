import { PropsWithChildren } from "react"

import { createClient } from "@/utils/supabase/server"

import { AuthProviderClient } from "./client"

export function getUser() {
  const supabase = createClient()
  return supabase.auth.getUser().then(({ data }) => data.user)
}

export async function AuthProvider({ children }: PropsWithChildren) {
  const user = await getUser()

  return <AuthProviderClient initialUser={user}>{children}</AuthProviderClient>
}
