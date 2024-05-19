"use client"

import { useEffect, useState } from "react"

import { cn } from "@/utils/cn"

export function PublishedAt({ publishedAt }: { publishedAt: string }) {
  const [text, setText] = useState<string>()

  useEffect(() => {
    setText(
      new Date(publishedAt).toLocaleString("es-UY", { dateStyle: "long" }),
    )
  }, [publishedAt])

  return (
    <div
      className={cn(
        "mt-1 block whitespace-pre text-sm text-muted-foreground",
        text && "duration-300 animate-in fade-in",
      )}
    >
      {text || " "}
    </div>
  )
}
