"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment } from "react"

import { Button } from "@/components/ui/button"

import { fetchCourseMasterData } from "./fetch-course-master-data"

export function MaybeCourseClassLists({
  course,
}: {
  course: NonNullable<
    NonNullable<
      NonNullable<
        Awaited<ReturnType<typeof fetchCourseMasterData>>
      >["course_editions"]
    >["courses"]
  >
}) {
  const render =
    course.course_editions.length > 1 ||
    (course.course_editions.length === 1 &&
      course.course_editions[0].course_class_lists.length > 1)

  const pathname = usePathname()

  if (!render) return null

  return (
    <div className="flex flex-wrap gap-2 px-2">
      {course.course_editions.map((edition) => (
        <Fragment key={edition.id}>
          {edition.course_class_lists.map((list) => {
            const specifyYear = course.course_editions.length > 1
            const specifySemester =
              edition.course_class_lists.length > 1 ||
              (course.course_editions.length === 1 &&
                course.course_editions[0].course_class_lists.length > 1)

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
