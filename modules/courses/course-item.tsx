import Link from "next/link"

import { Button } from "@/components/ui/button"
import { QueryResult } from "@/utils/supabase/query-result"

type Props = {
  course: QueryResult<
    "courses",
    `
    id,
    name,
    code,
    latest_course_class_list:course_class_lists!latest_course_class_list(
      code
    )
  `
  >
}

export function CourseItem({ course }: Props) {
  return (
    <li key={course.id} className="rounded-md border border-border">
      <Button
        asChild
        variant="link"
        className="block h-auto justify-start whitespace-pre-wrap py-4"
      >
        <Link
          href={`/courses/${course.latest_course_class_list?.code || course.code}`}
        >
          {course.name}
        </Link>
      </Button>
    </li>
  )
}
