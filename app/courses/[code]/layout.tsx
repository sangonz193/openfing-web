import { PropsWithChildren } from "react"

import { CourseMaster } from "@/modules/course/course-master"
import { fetchCourseMasterData } from "@/modules/course/fetch-course-master-data"

export default async function Page(
  props: PropsWithChildren & { params: { code: string } },
) {
  const { children, params } = props
  const courseClassList = await fetchCourseMasterData(params.code)

  return (
    <div className="flex min-h-0 grow basis-0">
      <CourseMaster data={courseClassList} />

      {children}
    </div>
  )
}
