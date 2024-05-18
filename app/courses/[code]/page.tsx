import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { code: string } }) {
  const supabase = createClient()
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("code", params.code)
    .single()

  if (!course) {
    notFound()
  }

  return (
    <div>
      <pre>{JSON.stringify(course, null, 2)}</pre>

      <video controls autoPlay>
        <source
          src={`https://open.fing.edu.uy/media/${course.code}/${course.code}_01.mp4`}
        />
      </video>
    </div>
  )
}
