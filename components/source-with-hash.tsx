"use client"

import { ComponentProps, useMemo } from "react"

import { useHash } from "@/utils/use-hash"

type Props = ComponentProps<"source">

export function SourceWithHash(props: Props) {
  const hash = useHash()

  const src = useMemo(() => {
    if (hash === undefined) return props.src

    return `${props.src}${hash}`
  }, [hash, props.src])

  if (!src) return null

  return <source key={src} {...props} src={src} />
}
