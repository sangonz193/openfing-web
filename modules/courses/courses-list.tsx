"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  courses: { id: number; code: string; name: string }[]
}

export function CoursesList({ courses }: Props) {
  return (
    <div>
      <h3 className="mb-3 mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Courses
      </h3>

      <ul className="flex flex-col gap-2">
        {courses.map((course) => (
          <li key={course.id} className="rounded-md border border-border">
            <Button asChild variant="link" className="block justify-start">
              <Link href={`/courses/${course.code}`}>{course.name}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
