"use client"

import { ComponentProps, useEffect, useState } from "react"

type Props = ComponentProps<"source">

export function SourceWithHash(props: Props) {
  const [src, setSrc] = useState<string | null>()

  useEffect(() => {
    if (!props.src) {
      setSrc(null)
      return
    }

    setSrc(`${props.src}${location.hash}`)
  }, [props.src])

  if (src === undefined) return null

  return <source key={src} {...props} src={src || undefined} />
}
