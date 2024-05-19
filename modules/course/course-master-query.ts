import { createClient } from "@/utils/supabase/server"

export async function fetchCourseMasterData(code: string) {
  const supabase = createClient()
  const { data: courseClassList } = await supabase
    .from("course_class_lists")
    .select(
      `
      code,
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
    .single()

  return courseClassList
}
