"use client"

import { ComponentProps, PropsWithChildren } from "react"
import { InPortal } from "react-reverse-portal"

import { withWrappers } from "@/utils/react/with-wrappers"

import { CourseLayoutProvider, useCourseLayoutContext } from "./provider"
import { CourseClassList } from "../course-class-list"
import { CourseMaster } from "../course-master"

interface Props
  extends ComponentProps<typeof CourseMaster>,
    PropsWithChildren {}

function CourseLayout(props: Props) {
  const { children, data } = props

  const { courseClassListPortalNode } = useCourseLayoutContext()

  return (
    <>
      {courseClassListPortalNode && (
        <InPortal node={courseClassListPortalNode}>
          <CourseClassList
            courseClassListCode={data.code}
            courseClasses={data.course_classes}
          />
        </InPortal>
      )}

      <div className="min-h-0 grow basis-0 flex-row">
        <CourseMaster {...props} />

        {children}
      </div>
    </>
  )
}

const wrapped = withWrappers([CourseLayoutProvider], CourseLayout)

export { wrapped as CourseLayout }
