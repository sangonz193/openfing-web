import { getUser } from "@/modules/auth/get-user"
import { CoursesList } from "@/modules/courses/courses-list"
import { Favorites } from "@/modules/courses/favorites"
import { fetchFavorites } from "@/modules/courses/fetch-favorites"
import { Header } from "@/modules/courses/header"
import { createClient } from "@/utils/supabase/server"

export default async function Page() {
  const supabase = createClient()
  const courses = await supabase
    .from("courses")
    .select("*,latest_course_class_list(code)")
    .eq("visibility", "public")
    .order("name")

  const user = await getUser()
  const favorites = user ? await fetchFavorites(user.id) : []

  return (
    <div className="gap-4">
      <Header />

      {favorites && <Favorites favorites={favorites} />}

      <CoursesList
        courses={(courses.data ?? []).map((course) => ({
          id: course.id,
          code: course.code,
          name: course.name,
          latest_course_class_list: course.latest_course_class_list,
        }))}
      />
    </div>
  )
}
