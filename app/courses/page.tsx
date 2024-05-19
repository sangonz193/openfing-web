import { CoursesList } from "@/modules/courses/courses-list"
import { createClient } from "@/utils/supabase/server"

export default async function Page() {
  const supabase = createClient()
  const courses = await supabase
    .from("courses")
    .select("*,latest_course_class_list(code)")
    .eq("visibility", "public")
    .order("name")

  return (
    <CoursesList
      courses={(courses.data ?? []).map((course) => ({
        id: course.id,
        code: course.code,
        name: course.name,
        latest_course_class_list: course.latest_course_class_list,
      }))}
    />
  )
}
