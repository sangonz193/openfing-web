"use client"

import { useMemo } from "react"

import { cn } from "@/utils/cn"
import { useHash } from "@/utils/use-hash"

type Props = {
  src: string
}

export function Video(props: Props) {
  const hash = useHash()
  const src = useMemo(() => {
    if (hash === undefined) return props.src

    return `${props.src}${hash}`
  }, [hash, props.src])

  return (
    <video
      key={hash}
      autoPlay
      controls
      className={cn(
        "aspect-video bg-black",

        // https://stackoverflow.com/questions/20037784/html5-video-border-radius-in-chrome-not-working
        "[-webkit-mask-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)]",
      )}
    >
      <source src={src} />
    </video>
  )
}
