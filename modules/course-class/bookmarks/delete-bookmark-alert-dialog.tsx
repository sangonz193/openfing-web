import { useMutation, useQueryClient } from "@tanstack/react-query"

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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Tables } from "@/supabase/types"
import { createClient } from "@/utils/supabase/client"

import { useBookmarksQuery } from "./use-bookmarks"

type Props = {
  open: boolean
  bookmark: Tables<"course_class_bookmarks">
  onClose: () => void
}

export function DeleteBookmarkAlertDialog(props: Props) {
  const { open, onClose } = props

  return (
    <AlertDialog open={open} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <Content {...props} />
      </AlertDialogContent>
    </AlertDialog>
  )
}

function Content({ bookmark }: Props) {
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
    <>
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
    </>
  )
}
