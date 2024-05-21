import { ComponentProps } from "react"

import { CourseClassLists } from "./course-class-lists"

export function hasMultipleCourseClassLists(
  editions: ComponentProps<typeof CourseClassLists>["editions"],
) {
  return (
    editions.length > 1 ||
    (editions.length === 1 && editions[0].course_class_lists.length > 1)
  )
}
