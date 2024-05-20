import { ClapperboardIcon } from "lucide-react"
import { Metadata } from "next"

import { fetchCourseMasterData } from "@/modules/course/fetch-course-master-data"

type Props = {
  params: {
    code: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await fetchCourseMasterData(params.code)
  if (!result) return {}
  const course = result.course_editions?.courses

  return {
    title: course ? `${course.name} - OpenFING` : "Course not found",
  }
}

export default async function Page() {
  return (
    <div className="shrink grow items-center justify-center gap-2">
      <ClapperboardIcon className="mx-auto size-20 text-muted-foreground" />
      <p className="text-center font-medium text-muted-foreground">
        Elije una clase para ver el video.
      </p>
    </div>
  )
}
