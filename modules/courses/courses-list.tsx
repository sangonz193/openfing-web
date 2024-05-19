"use client"

import Fuse from "fuse.js"
import { KeyboardIcon, SearchIcon } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQueryParamState } from "@/lib/next/use-query-param-state"
import { Tables } from "@/supabase/types.gen"

type Props = {
  courses: Pick<Tables<"courses">, "id" | "name" | "code">[]
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
          <div className="relative mb-4 flex">
            <Input
              value={search ?? ""}
              placeholder="Buscar curso..."
              onChange={(e) => setSearch(e.target.value)}
              className="pr-9"
            />
            <SearchIcon className="absolute right-2 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          </div>

          {searchResults.map((course) => (
            <li
              key={course.item.id}
              className="rounded-md border border-border"
            >
              <Button
                asChild
                variant="link"
                className="block h-auto justify-start whitespace-pre-wrap py-4"
              >
                <Link href={`/courses/${course.item.code}`}>
                  {course.item.name}
                </Link>
              </Button>
            </li>
          ))}

          {searchResults.length === 0 && <EmptyState />}
        </ul>
      </div>
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
