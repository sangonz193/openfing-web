"use client"

import Fuse from "fuse.js"
import { KeyboardIcon, SearchIcon } from "lucide-react"
import { ComponentProps, useMemo } from "react"

import { Input } from "@/components/ui/input"
import { useQueryParamState } from "@/utils/next/use-query-param-state"

import { CourseItem } from "./course-item"

type Props = {
  courses: ComponentProps<typeof CourseItem>["course"][]
}

export function CoursesList({ courses }: Props) {
  const [search, setSearch] = useQueryParamState("search")

  const fuse = useMemo(() => {
    return new Fuse(courses, {
      keys: ["name"] satisfies (keyof (typeof courses)[0])[],
    })
  }, [courses])

  const searchResults = useMemo(() => {
    if (!search) return courses.map((course) => ({ item: course }))
    return fuse.search(search ?? "")
  }, [courses, fuse, search])

  return (
    <div className="mx-auto w-full max-w-md grow pb-10">
      <div className="mb-4 flex px-4">
        <div className="relative flex-row">
          <Input
            value={search ?? ""}
            placeholder="Buscar curso..."
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9"
          />
          <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {searchResults.length > 0 && (
        <ul className="flex flex-col gap-2 px-4">
          {searchResults.map((course) => (
            <CourseItem key={course.item.id} course={course.item} />
          ))}
        </ul>
      )}

      {searchResults.length === 0 && <EmptyState />}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="mt-2 gap-3">
      <KeyboardIcon
        className="mx-auto size-40 text-muted-foreground opacity-50"
        strokeWidth={0.5}
      />

      <div>
        <div className="text-center text-xl text-muted-foreground">
          No se encontraron resultados para la búsqueda
        </div>
      </div>
    </div>
  )
}
