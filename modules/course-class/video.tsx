"use client"

import { useEffect, useMemo } from "react"

import { useVideoState } from "@/components/video/use-state"
import { Video } from "@/components/video/video"
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

export function CourseClassVideo(props: Props) {
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
      <Video
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
      </Video>

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
  const { mutate } = useCreateView({ userId })
  const { paused } = useVideoState()

  useEffect(() => {
    if (paused) {
      return
    }

    const interval = setInterval(() => {
      if (!videoRef.current) return
      const { currentTime, duration } = videoRef.current

      mutate({
        courseClassId,
        seconds: currentTime,
        total: duration,
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [courseClassId, mutate, paused, videoRef])

  return null
}
