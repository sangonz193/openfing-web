import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"

import { fetchFavorites } from "./fetch-favorites"
import { CourseClassLists } from "../course/course-class-lists"
import { hasMultipleCourseClassLists } from "../course/has-multiple-course-class-lists"

type Props = {
  favorites: Awaited<ReturnType<typeof fetchFavorites>>
  className?: string
}

export function Favorites({ favorites, className }: Props) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl gap-2 px-4", className)}>
      <span className="font-medium">Favoritos</span>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        {favorites.map((f) => (
          <Favorite key={f.courses?.id} item={f} />
        ))}
      </div>
    </div>
  )
}

function Favorite({ item }: { item: Props["favorites"][0] }) {
  if (!item.courses) return null

  const multipleCourseClassLists = hasMultipleCourseClassLists(
    item.courses.course_editions,
  )

  return (
    <div className="min-w-0 max-w-full rounded-md border p-4">
      {multipleCourseClassLists && item.courses.name}

      {!multipleCourseClassLists && (
        <Button
          asChild
          variant="link"
          className="h-auto justify-start px-0 py-0 text-base font-normal"
        >
          <Link href={`/courses/${item.courses.code}`}>
            {item.courses.name}
          </Link>
        </Button>
      )}

      {multipleCourseClassLists && (
        <CourseClassLists
          editions={item.courses.course_editions}
          className="mt-2 p-0"
        />
      )}
    </div>
  )
}
