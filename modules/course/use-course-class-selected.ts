import { usePathname } from "next/navigation"

const regex = /^\/courses\/([^/])+\//

export function useCourseClassSelected() {
  const pathname = usePathname()
  const match = pathname.match(regex)

  return !!match && pathname.length > match?.[0].length
}
