"use client"

import { OutPortal } from "react-reverse-portal"

import { useBreakpoint } from "@/utils/browser/use-breakpoint"

import { useCourseLayoutContext } from "./layout/provider"

export function MaxLgCourseClassList() {
  const { courseClassListPortalNode } = useCourseLayoutContext()
  const isLg = useBreakpoint("lg", true)

  return (
    <>
      {!isLg && courseClassListPortalNode && (
        <div className="mt-4">
          <OutPortal node={courseClassListPortalNode} />
        </div>
      )}
    </>
  )
}
