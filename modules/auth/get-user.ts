import { cache } from "react"

import { createClient } from "@/utils/supabase/server"

export const getUser = cache(async () => {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  return data.user
})
