import { createClient } from "@/utils/supabase/server"

export async function fetchFavorites(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("favorite_courses")
    .select(
      `
      id,
      courses(
        id,
        name,
        code,
        course_editions(
          id,
          name,
          year,
          semester,
          course_class_lists(
            id,
            name,
            code
          )
        )
      )
    `,
    )
    .eq("user_id", userId)
    .order("year", {
      referencedTable: "courses.course_editions",
      ascending: false,
    })
    .order("semester", {
      referencedTable: "courses.course_editions",
      ascending: false,
    })
    .order("created_at", {
      referencedTable: "courses.course_editions.course_class_lists",
      ascending: false,
    })

  if (error) {
    console.warn(error)
    return []
  }

  return data
}
