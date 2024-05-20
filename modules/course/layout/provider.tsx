"use client"

import { PropsWithChildren, createContext, useContext, useRef } from "react"
import { HtmlPortalNode, createHtmlPortalNode } from "react-reverse-portal"

import { cn } from "@/utils/cn"
import { useClientSideInit } from "@/utils/react/use-client-side-init"

const Context = createContext<{
  courseClassListPortalNode: HtmlPortalNode | null
  videoRef: React.RefObject<HTMLVideoElement>
}>({
  courseClassListPortalNode: null,
  videoRef: { current: null },
})

export function CourseLayoutProvider({ children }: PropsWithChildren) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const courseClassListPortalNode = useClientSideInit(() =>
    createHtmlPortalNode({ attributes: { class: cn("grow flex flex-col") } }),
  )

  return (
    <Context.Provider
      value={{
        courseClassListPortalNode,
        videoRef,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useCourseLayoutContext() {
  return useContext(Context)
}
