"use client"

import { UserIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { useUser } from "./use-user"

type Props = {
  className?: string
}

export function MaybeAccountAvatar({ className }: Props) {
  const user = useUser()

  if (!user) return null

  return (
    <Avatar className={className}>
      <AvatarFallback>
        <UserIcon className="size-5" />
      </AvatarFallback>
    </Avatar>
  )
}
