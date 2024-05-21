"use client"

import { HistoryIcon } from "lucide-react"
import Link from "next/link"

import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"

import { useLastViewsQuery } from "./use-last-views"

type Props = {
  className?: string
}

export function LastViews({ className }: Props) {
  const query = useLastViewsQuery()
  const views = query.data

  return (
    <div className={cn("mx-auto w-full max-w-5xl gap-2 px-4", className)}>
      <span className="font-medium">Vistas recientes</span>

      {!!views?.length && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {views.map((v) => (
            <LastView key={v.id} item={v} />
          ))}
        </div>
      )}

      {query.isLoading && <Spinner className="min-h-20" />}

      {query.isSuccess && !views?.length && <EmptyState />}
    </div>
  )
}

function LastView({
  item,
}: {
  item: NonNullable<ReturnType<typeof useLastViewsQuery>["data"]>[0]
}) {
  const courseClass = item.course_classes

  if (!courseClass?.course_class_lists) return null
  const courseClassList = courseClass.course_class_lists
  const courseName = courseClassList.course_editions?.courses?.name

  return (
    <div className="relative min-w-0 max-w-full overflow-hidden rounded-md border p-4">
      <Button
        asChild
        variant="link"
        className="flex h-auto flex-col items-start justify-start whitespace-pre-wrap px-0 py-0 text-left text-base font-normal"
      >
        <Link
          href={`/courses/${courseClassList.code}/${courseClass.number}?t=${item.seconds}`}
        >
          {courseClass.number} - {courseClass.name}
          {courseName && (
            <span className="text-sm text-muted-foreground">{courseName}</span>
          )}
        </Link>
      </Button>

      <div
        className="absolute bottom-0 left-0 h-1 rounded-full bg-foreground"
        style={{
          width: `${item.progress}%`,
        }}
      />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="pb-4">
      <HistoryIcon className="mx-auto size-14 text-muted-foreground" />
      <p className="text-center font-medium text-muted-foreground">
        No tienes vistas recientes
      </p>
    </div>
  )
}
