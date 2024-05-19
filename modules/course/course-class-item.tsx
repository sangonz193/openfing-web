"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tables } from "@/supabase/types.gen"

type Props = {
  courseClass: Pick<Tables<"course_classes">, "number" | "name">
  courseClassListCode: string
}

export function CourseClassItem(props: Props) {
  const { courseClass, courseClassListCode } = props
  const pathname = usePathname()
  const href = `/courses/${courseClassListCode}/${courseClass.number}`
  const isActive =
    pathname.startsWith(href) &&
    (pathname.length === href.length ||
      ["/", "?"].includes(pathname[href.length]))

  return (
    <Button
      asChild
      variant={isActive ? undefined : "link"}
      className="h-auto justify-start whitespace-pre-wrap py-3"
    >
      <Link href={href}>{courseClass.name}</Link>
    </Button>
  )
}
