"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

import { Button } from "@/components/ui/button"
import { Tables } from "@/supabase/types"
import { cn } from "@/utils/cn"

type Props = {
  editions: (Pick<Tables<"course_editions">, "id" | "year" | "semester"> & {
    course_class_lists: Pick<
      Tables<"course_class_lists">,
      "id" | "code" | "name"
    >[]
  })[]
  className?: string
}

export function CourseClassLists({ editions, className }: Props) {
  const pathname = usePathname()

  return (
    <div className={cn("flex-row flex-wrap gap-2 px-2", className)}>
      {editions.map((edition) => (
        <Fragment key={edition.id}>
          {edition.course_class_lists.map((list) => {
            const specifyYear = editions.length > 1
            const specifySemester =
              edition.course_class_lists.length > 1 ||
              (editions.length === 1 &&
                editions[0].course_class_lists.length > 1)

            const href = `/courses/${list.code}`
            const isActive =
              pathname.startsWith(href) &&
              (pathname.length === href.length ||
                ["/", "?"].includes(pathname[href.length]))

            return (
              <Button
                key={list.id}
                asChild
                variant={isActive ? undefined : "outline"}
                size="sm"
              >
                <Link href={href}>
                  {list.name}
                  {specifyYear && ` ${edition.year}`}
                  {specifySemester &&
                    `, ${edition.semester}${edition.semester === 1 ? "er" : "do"} semestre`}
                </Link>
              </Button>
            )
          })}
        </Fragment>
      ))}
    </div>
  )
}
