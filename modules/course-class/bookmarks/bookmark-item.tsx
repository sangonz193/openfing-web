import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TrashIcon } from "lucide-react"

import { Spinner } from "@/components/spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Tables } from "@/supabase/types"
import { createClient } from "@/utils/supabase/client"

import { useBookmarksQuery } from "./use-bookmarks"
import { secondsToInput } from "../share/input-to-seconds"

type Props = {
  bookmark: Tables<"course_class_bookmarks">
}

export function BookmarkItem({ bookmark }: Props) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient()

      const { error } = await supabase
        .from("course_class_bookmarks")
        .delete()
        .eq("id", bookmark.id)

      if (error) throw error

      return null
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useBookmarksQuery.key({
          courseClassId: bookmark.course_class_id,
        }),
      })
    },
  })

  return (
    <div className="flex-row rounded-md border py-2">
      <Button
        type="button"
        variant="link"
        className="flex h-auto grow flex-col items-start justify-start gap-0 text-left"
      >
        <span className="text-lg font-semibold">{bookmark.title}</span>
        {!!bookmark.start_at && (
          <span className="-mt-1 mb-1 text-xs text-muted-foreground">
            {secondsToInput(bookmark.start_at)}
            {!!bookmark.end_at && (
              <>
                {" - "}
                {secondsToInput(bookmark.end_at)}
              </>
            )}
          </span>
        )}

        {!!bookmark.description && (
          <span className="text-base font-normal">{bookmark.description}</span>
        )}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive" className="mr-2">
            <span className="sr-only">Eliminar</span>
            <TrashIcon className="size-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar marcador</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar este marcador?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                deleteMutation.mutate()
              }}
            >
              <Button variant="destructive" asChild>
                <AlertDialogAction
                  type="submit"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending && <Spinner />}
                  Eliminar
                </AlertDialogAction>
              </Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
