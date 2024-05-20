"use client"

import { useMemo } from "react"

import { cn } from "@/utils/cn"

import { useCourseLayoutContext } from "./course/layout/provider"

type Props = {
  src: string
  start?: number
  end?: number
}

export function Video(props: Props) {
  const { start, end } = props
  const { videoRef } = useCourseLayoutContext()
  const src = useMemo(() => {
    if (start === undefined) return props.src

    let result = `${props.src}#t=${start}`
    if (end !== undefined) result += `,${end}`

    return result
  }, [end, props.src, start])

  return (
    <video
      ref={videoRef}
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
