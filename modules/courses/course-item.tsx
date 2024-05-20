import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tables } from "@/supabase/types"

type Props = {
  course: Pick<
    Tables<"courses">,
    "id" | "name" | "code" | "latest_course_class_list"
  > & {
    latest_course_class_list: Pick<Tables<"course_class_lists">, "code"> | null
  }
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
