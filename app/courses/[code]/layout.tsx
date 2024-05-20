import { notFound } from "next/navigation"
import { PropsWithChildren } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { fetchCourseMasterData } from "@/modules/course/fetch-course-master-data"
import { CourseLayout } from "@/modules/course/layout/layout"

export default async function Page(
  props: PropsWithChildren & { params: { code: string } },
) {
  const { children, params } = props
  const courseClassList = await fetchCourseMasterData(params.code)

  if (!courseClassList?.course_editions?.courses) notFound()

  return (
    <div className="grow">
      <header className="flex h-14 items-center gap-2 border-b px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Cursos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {courseClassList?.course_editions?.courses?.name}
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* <MaybeAccountAvatar className="ml-auto" /> */}
      </header>

      <CourseLayout
        data={{
          ...courseClassList,
          course_editions: {
            ...courseClassList.course_editions,
            courses: courseClassList.course_editions.courses,
          },
        }}
      >
        {children}
      </CourseLayout>
    </div>
  )
}
