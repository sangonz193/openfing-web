import { DownloadIcon, ExternalLinkIcon } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cache } from "react"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { MaxLgCourseClassList } from "@/modules/course/max-lg-course-class-list"
import { PublishedAt } from "@/modules/course/published-at"
import { MaybeBookmarks } from "@/modules/course-class/bookmarks/bookmarks"
import { getVideoUrl } from "@/modules/course-class/get-video-url"
import { ShareCourseClass } from "@/modules/course-class/share/share"
import { Video } from "@/modules/course-class/video"
import { createClient } from "@/utils/supabase/server"

const fetchData = cache(async (code: string, number: string) => {
  const supabase = createClient()
  const { data: courseClass } = await supabase
    .from("course_classes")
    .select(
      `
      id,
      name,
      course_class_lists!inner(*),
      published_at
    `,
    )
    .eq("number", number)
    .eq("course_class_lists.code", code)
    .single()

  return courseClass
})

type Props = {
  params: { code: string; number: string }
  searchParams: { t?: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const courseClass = await fetchData(params.code, params.number)
  if (!courseClass) return {}

  return {
    title: `${courseClass.name} - OpenFING`,
  }
}

export default async function Page({ params, searchParams }: Props) {
  const courseClass = await fetchData(params.code, params.number)
  if (!courseClass) return notFound()

  const searchValidation = z
    .string()
    .transform((value) => {
      const values = value.split(",")

      return {
        start: values[0] || undefined,
        end: values[1] || undefined,
      }
    })
    .pipe(
      z.object({
        start: z.coerce.number(),
        end: z.coerce.number().optional(),
      }),
    )
    .safeParse(searchParams.t)

  const videoUrl = getVideoUrl(params)

  return (
    <div className="shrink grow overflow-auto px-4 pb-10 pt-2">
      <div className="mx-auto w-full max-w-screen-2xl">
        <div className="shrink-0 overflow-hidden rounded-lg border">
          <Video
            src={videoUrl}
            start={searchValidation.data?.start}
            end={searchValidation.data?.end}
            courseClassId={courseClass.id}
          />
        </div>

        <span className="mt-4 text-2xl">{courseClass.name}</span>

        {courseClass.published_at && (
          <PublishedAt publishedAt={courseClass.published_at} />
        )}

        <div className="mt-4 flex-row gap-2 overflow-auto">
          <Button asChild variant="outline">
            <a href={videoUrl} download>
              <DownloadIcon className="size-4" />
              Descargar
            </a>
          </Button>

          <ShareCourseClass />

          <MaybeBookmarks
            courseClassId={courseClass.id}
            courseClassNumber={params.number}
            courseClassListCode={params.code}
          />

          <Button asChild variant="outline">
            <Link
              href={`https://open.fing.edu.uy/courses/${params.code}/${params.number}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLinkIcon className="size-4" />
              open.fing.edu.uy
            </Link>
          </Button>
        </div>

        <MaxLgCourseClassList />
      </div>
    </div>
  )
}
