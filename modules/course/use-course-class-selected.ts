import { useSelectedLayoutSegments } from "next/navigation"

export function useCourseClassSelected() {
  const segments = useSelectedLayoutSegments()
  if (segments.length === 0) return false

  return segments.length > 1 || segments[0] !== "courses"
}
