"use client"

import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Tables } from "@/supabase/types.gen"

type Props = {
  courses: Pick<Tables<"courses">, "id" | "name" | "code">[]
}

export function CoursesList({ courses }: Props) {
  return (
    <div className="flex grow flex-col">
      <header className="flex h-14 items-center border-b px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Cursos</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="min-h-0 grow basis-0 overflow-auto pb-10 pt-4">
        <ul className="mx-auto flex w-full max-w-md flex-col gap-2 px-2">
          {courses.map((course) => (
            <li key={course.id} className="rounded-md border border-border">
              <Button
                asChild
                variant="link"
                className="block h-auto justify-start whitespace-pre-wrap py-4"
              >
                <Link href={`/courses/${course.code}`}>{course.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
