import { DownloadIcon } from "lucide-react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"

import { Button } from "@/components/ui/button"
import { MaxLgCourseClassList } from "@/modules/course/max-lg-course-class-list"
import { PublishedAt } from "@/modules/course/published-at"
import { ShareCourseClass } from "@/modules/course-class/share/share"
import { Video } from "@/modules/video"
import { createClient } from "@/utils/supabase/server"

const fetchData = cache(async (code: string, number: string) => {
  const supabase = createClient()
  const { data: courseClass } = await supabase
    .from("course_classes")
    .select("name, course_class_lists!inner(*), published_at")
    .eq("number", number)
    .eq("course_class_lists.code", code)
    .single()

  return courseClass
})

type Props = {
  params: { code: string; number: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseClass = await fetchData(params.code, params.number)
  if (!courseClass) return {}

  return {
    title: `${courseClass.name} - OpenFING`,
  }
}

export default async function Page({ params }: Props) {
  const courseClass = await fetchData(params.code, params.number)
  if (!courseClass) return notFound()

  const videoUrl = `https://open.fing.edu.uy/media/${params.code}/${params.code}_${params.number.toString().padStart(2, "0")}.mp4`

  return (
    <div className="flex grow flex-col overflow-auto px-4 pb-10 pt-2">
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col">
        <div className="flex shrink-0 flex-col overflow-hidden rounded-lg border">
          <Video src={videoUrl} />
        </div>

        <span className="mt-4 text-2xl">{courseClass.name}</span>

        {courseClass.published_at && (
          <PublishedAt publishedAt={courseClass.published_at} />
        )}

        <div className="mt-4 flex gap-2">
          <Button asChild variant="outline">
            <a href={videoUrl} download>
              <DownloadIcon className="size-4" />
              Descargar
            </a>
          </Button>

          <ShareCourseClass />
        </div>

        <MaxLgCourseClassList />
      </div>
    </div>
  )
}
