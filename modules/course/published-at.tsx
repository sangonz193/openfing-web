"use client"

import { useEffect, useState } from "react"

export function PublishedAt({ publishedAt }: { publishedAt: string }) {
  const [text, setText] = useState<string>()

  useEffect(() => {
    setText(
      new Date(publishedAt).toLocaleString("es-UY", { dateStyle: "long" }),
    )
  }, [publishedAt])

  return (
    <div className="flex min-h-8 items-center text-muted-foreground">
      {text}
    </div>
  )
}
