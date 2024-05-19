"use client"

import { Turnstile } from "@marsidev/react-turnstile"
import { useEffect, useRef, useState } from "react"

import { createClient } from "@/utils/supabase/client"

import { useUser } from "./use-user"
import { clientEnv } from "../env/client"

export function AutoSignIn() {
  const [captchaToken, setCaptchaToken] = useState<string>()
  const user = useUser()

  const signInCalledRef = useRef(false)
  useEffect(() => {
    if (!captchaToken || user !== null || signInCalledRef.current) return

    signInCalledRef.current = true

    const supabase = createClient()
    supabase.auth.signInAnonymously({
      options: { captchaToken },
    })
  }, [captchaToken, user])

  return (
    <Turnstile
      siteKey={clientEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      onSuccess={setCaptchaToken}
      className="sr-only"
    />
  )
}
