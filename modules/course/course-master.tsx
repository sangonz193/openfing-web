import { notFound } from "next/navigation"

import { CourseClassItem } from "./course-class-item"
import { CourseMasterContainer } from "./course-master-container"
import { fetchCourseMasterData } from "./fetch-course-master-data"
import { MaybeCourseClassLists } from "./maybe-course-class-lists"

type Props = {
  data: Awaited<ReturnType<typeof fetchCourseMasterData>>
}

export function CourseMaster(props: Props) {
  const { data } = props
  if (!data?.course_editions?.courses) notFound()

  const course = data.course_editions.courses
  const courseClasses = data.course_classes

  return (
    <CourseMasterContainer className="max-w-sm shrink-0 gap-3 overflow-auto border-r pb-10 pt-2">
      <MaybeCourseClassLists course={course} />

      <div className="flex flex-col gap-2 px-2">
        {courseClasses.map((courseClass) => (
          <CourseClassItem
            key={courseClass.id}
            courseClass={courseClass}
            courseClassListCode={data.code}
          />
        ))}
      </div>
    </CourseMasterContainer>
  )
}
