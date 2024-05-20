"use client"

import { PropsWithChildren, createContext, useContext } from "react"
import { HtmlPortalNode, createHtmlPortalNode } from "react-reverse-portal"

import { cn } from "@/utils/cn"
import { useClientSideInit } from "@/utils/react/use-client-side-init"

const Context = createContext<{
  courseClassListPortalNode: HtmlPortalNode | null
}>({
  courseClassListPortalNode: null,
})

export function CourseLayoutProvider({ children }: PropsWithChildren) {
  const courseClassListPortalNode = useClientSideInit(() =>
    createHtmlPortalNode({ attributes: { class: cn("grow flex flex-col") } }),
  )

  return (
    <Context.Provider
      value={{
        courseClassListPortalNode,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useCourseLayout() {
  return useContext(Context)
}
