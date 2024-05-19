import { cache } from "react"

import { createClient } from "@/utils/supabase/server"

export const fetchCourseMasterData = cache(async (code: string) => {
  const supabase = createClient()
  const { data: courseClassList } = await supabase
    .from("course_class_lists")
    .select(
      `
      code,
      name,
      course_editions(
        courses(
          id,
          name,
          course_editions(
            id,
            name,
            semester,
            year,
            course_class_lists(
              id,
              code,
              name
            )
          )
        )
      ),
      course_classes(
        id,
        name,
        number
      )
  `,
    )
    .eq("code", code)
    .order("year", {
      referencedTable: "course_editions.courses.course_editions",
      ascending: false,
    })
    .order("semester", {
      referencedTable: "course_editions.courses.course_editions",
      ascending: false,
    })
    .order("number", { referencedTable: "course_classes" })
    .single()

  return courseClassList
})
