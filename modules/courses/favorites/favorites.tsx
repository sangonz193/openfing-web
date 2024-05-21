"use client"

import { StarIcon } from "lucide-react"
import Link from "next/link"

import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"

import { useFavoritesQuery } from "./use-favorites"
import { CourseClassLists } from "../../course/course-class-lists"
import { hasMultipleCourseClassLists } from "../../course/has-multiple-course-class-lists"

type Props = {
  className?: string
}

export function Favorites({ className }: Props) {
  const query = useFavoritesQuery()
  const favorites = query.data

  return (
    <div className={cn("mx-auto w-full max-w-5xl gap-2 px-4", className)}>
      <span className="font-medium">Favoritos</span>

      {!!favorites?.length && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((f) => (
            <Favorite key={f.courses?.id} item={f} />
          ))}
        </div>
      )}

      {query.isPending && <Spinner className="min-h-20" />}

      {query.isSuccess && !favorites?.length && <EmptyState />}
    </div>
  )
}

function Favorite({
  item,
}: {
  item: NonNullable<ReturnType<typeof useFavoritesQuery>["data"]>[0]
}) {
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
          className="h-auto justify-start whitespace-pre-wrap px-0 py-0 text-base font-normal"
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

function EmptyState() {
  return (
    <div className="pb-4">
      <StarIcon className="mx-auto size-14 text-muted-foreground" />
      <p className="text-center font-medium text-muted-foreground">
        No tienes favoritos
      </p>
    </div>
  )
}
