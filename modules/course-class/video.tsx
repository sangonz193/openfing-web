"use client"

import { useEffect, useMemo } from "react"

import { cn } from "@/utils/cn"

import { useCreateView } from "./views/use-create-view"
import { useUser } from "../auth/use-user"
import { useCourseLayoutContext } from "../course/layout/provider"

type Props = {
  src: string
  start?: number
  end?: number
  courseClassId: string
}

export function Video(props: Props) {
  const { start, end, courseClassId } = props
  const { videoRef } = useCourseLayoutContext()
  const user = useUser()

  const src = useMemo(() => {
    if (start === undefined) return props.src

    let result = `${props.src}#t=${start}`
    if (end !== undefined) result += `,${end}`

    return result
  }, [end, props.src, start])

  return (
    <>
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

      {user && (
        <TrackView
          userId={user.id}
          videoRef={videoRef}
          courseClassId={courseClassId}
        />
      )}
    </>
  )
}

function TrackView({
  videoRef,
  userId,
  courseClassId,
}: {
  userId: string
  videoRef: React.RefObject<HTMLVideoElement>
  courseClassId: string
}) {
  const mutation = useCreateView({ userId })

  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current) return
      const { currentTime, duration } = videoRef.current

      mutation.mutate({
        courseClassId,
        seconds: currentTime,
        total: duration,
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [courseClassId, mutation, videoRef])

  return null
}
