"use client"

import { Turnstile } from "@marsidev/react-turnstile"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from "@/utils/supabase/client"

import { useUser } from "./use-user"
import { clientEnv } from "../env/client"

export function MaybeSignIn({ className }: { className: string }) {
  const user = useUser()
  return (
    <Dialog>
      {user === null && (
        <DialogTrigger asChild>
          <Button className={className} variant="outline">
            Funcionalidades extra
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <Content />
      </DialogContent>
    </Dialog>
  )
}

function Content() {
  const user = useUser()
  const [captchaToken, setCaptchaToken] = useState<string>()

  const mutation = useMutation({
    mutationFn: async () => {
      if (!captchaToken || user !== null) return

      const supabase = createClient()
      await supabase.auth.signInAnonymously({
        options: { captchaToken },
      })

      window.location.reload()
    },
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle>Funcionalidades extra</DialogTitle>

        <DialogDescription className="whitespace-pre-wrap">
          Para desbloquear funcionalidades extra, haz click en el botón mágico
          de abajo.
        </DialogDescription>
      </DialogHeader>

      <Button
        className="mx-auto mt-4"
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || !captchaToken}
      >
        {mutation.isPending && <Spinner />}

        <span className="whitespace-pre">
          Desbloquear{"  "}
          <span className="text-lg">🪄</span>
        </span>
      </Button>

      <Turnstile
        siteKey={clientEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        onSuccess={setCaptchaToken}
        className="sr-only"
      />
    </>
  )
}
