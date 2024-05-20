import { useEffect, useRef } from "react"

import { useCourseLayoutContext } from "@/modules/course/layout/provider"

export function useCourseClassVideo() {
  const courseLayout = useCourseLayoutContext()
  const pausedRef = useRef(false)

  useEffect(() => {
    const video = courseLayout.videoRef.current
    if (video && !video.paused) {
      pausedRef.current = true
      video.pause()
    }

    return () => {
      if (!pausedRef.current) return
      video?.play()
    }
  }, [courseLayout.videoRef])
}
