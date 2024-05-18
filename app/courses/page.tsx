import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const courses = await supabase.from("courses").select("*");

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {courses.data?.map((course) => (
          <li key={course.id}>
            <a href={`/courses/${course.code}`}>{course.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
