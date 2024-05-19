"use client"

import { useSelectedLayoutSegments } from "next/navigation"
import { ComponentProps } from "react"

import { cn } from "@/utils/cn"

type Props = ComponentProps<"div"> & {
  className?: string
}

export function CourseMasterContainer(props: Props) {
  const segments = useSelectedLayoutSegments()

  return (
    <div
      {...props}
      className={cn(
        props.className,
        "flex-col",
        !!segments.length && "hidden md:flex",
        !segments.length && "flex max-md:w-full max-md:max-w-none",
      )}
    >
      {props.children}
    </div>
  )
}
