"use client"

import { OutPortal } from "react-reverse-portal"
import { Except } from "type-fest"

import { useBreakpoint } from "@/utils/browser/use-breakpoint"
import { cn } from "@/utils/cn"

import { fetchCourseMasterData } from "./fetch-course-master-data"
import { useCourseLayoutContext } from "./layout/provider"
import { MaybeCourseClassLists } from "./maybe-course-class-lists"
import { useCourseClassSelected } from "./use-course-class-selected"

type Props = {
  data: Except<
    NonNullable<Awaited<ReturnType<typeof fetchCourseMasterData>>>,
    "course_editions"
  > & {
    course_editions: Except<
      NonNullable<
        NonNullable<
          Awaited<ReturnType<typeof fetchCourseMasterData>>
        >["course_editions"]
      >,
      "courses"
    > & {
      courses: NonNullable<
        NonNullable<
          NonNullable<
            Awaited<ReturnType<typeof fetchCourseMasterData>>
          >["course_editions"]
        >["courses"]
      >
    }
  }
}

export function CourseMaster(props: Props) {
  const { data } = props

  const course = data.course_editions.courses

  const { courseClassListPortalNode } = useCourseLayoutContext()
  const isLg = useBreakpoint("lg")
  const courseClassSelected = useCourseClassSelected()

  return (
    <div
      className={cn(
        "w-full max-w-sm shrink-0 gap-3 overflow-auto border-r pb-10 pt-2",
        "flex-col",
        courseClassSelected && "hidden lg:flex",
        !courseClassSelected && "flex max-lg:w-full max-lg:max-w-none",
      )}
    >
      <MaybeCourseClassLists course={course} />

      {(isLg || !courseClassSelected) && courseClassListPortalNode && (
        <div className="px-2">
          <OutPortal node={courseClassListPortalNode} />
        </div>
      )}
    </div>
  )
}
