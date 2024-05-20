"use client"

import { BookmarkIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from "@/modules/auth/use-user"

import { BookmarkItem } from "./bookmark-item"
import { CreateBookmark } from "./create/create-bookmark"
import { useBookmarksQuery } from "./use-bookmarks"

type Props = {
  courseClassId: string
  courseClassNumber: string
  courseClassListCode: string
}

export function MaybeBookmarks(props: Props) {
  const user = useUser()
  if (!user) return null

  return <Bookmarks {...props} />
}

function Bookmarks({
  courseClassId,
  courseClassListCode,
  courseClassNumber,
}: Props) {
  const [open, setOpen] = useState(false)
  const query = useBookmarksQuery({ courseClassId })
  const { data, isSuccess } = query

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <BookmarkIcon className="size-4" />
          Marcadores
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Marcadores</SheetTitle>
          <SheetDescription>Tus marcadores para esta clase.</SheetDescription>
        </SheetHeader>

        <div className="-m-6 mt-0 shrink grow gap-3 overflow-auto p-6 pt-0">
          <CreateBookmark
            courseClassId={courseClassId}
            courseClassListCode={courseClassListCode}
            courseClassNumber={courseClassNumber}
          />

          {isSuccess && !data.length && <EmptyState />}

          {data?.map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              onClicked={() => setOpen(false)}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function EmptyState() {
  return (
    <div className="py-8">
      <BookmarkIcon className="mx-auto size-20 text-muted-foreground" />
      <p className="text-center font-medium text-muted-foreground">
        No tienes marcadores
      </p>
    </div>
  )
}
