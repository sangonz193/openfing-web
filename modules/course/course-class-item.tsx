"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Tables } from "@/supabase/types"

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
      className="group h-auto items-center justify-start whitespace-pre-wrap py-3 hover:no-underline"
    >
      <Link href={href}>
        <span className="shrink-0 font-mono">
          {courseClass.number.toString().padStart(2, " ")}
        </span>

        <span className="group-hover:underline">{courseClass.name}</span>
      </Link>
    </Button>
  )
}
