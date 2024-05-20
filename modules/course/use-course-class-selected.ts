import { usePathname } from "next/navigation"

export function useCourseClassSelected() {
  const pathname = usePathname()
  const coursesPath = "/courses/"

  return (
    pathname.startsWith(coursesPath) && pathname.length > coursesPath.length
  )
}
