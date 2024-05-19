import { PropsWithChildren } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CourseMaster } from "@/modules/course/course-master"
import { fetchCourseMasterData } from "@/modules/course/fetch-course-master-data"

export default async function Page(
  props: PropsWithChildren & { params: { code: string } },
) {
  const { children, params } = props
  const courseClassList = await fetchCourseMasterData(params.code)

  return (
    <div className="flex grow flex-col">
      <header className="flex h-14 items-center border-b px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {courseClassList?.course_editions?.courses?.name}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex min-h-0 grow basis-0">
        <CourseMaster data={courseClassList} />

        {children}
      </div>
    </div>
  )
}
