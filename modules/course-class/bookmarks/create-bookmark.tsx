import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BookmarkPlusIcon } from "lucide-react"
import { useState } from "react"
import { z } from "zod"

import { Spinner } from "@/components/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/modules/auth/use-user"
import { useZodForm } from "@/utils/react-hook-form/useZodForm"
import { createClient } from "@/utils/supabase/client"

import { schema } from "./create/schema"
import { useBookmarksQuery } from "./use-bookmarks"
import { inputToSeconds, secondsToInput } from "../share/input-to-seconds"

type Props = {
  courseClassId: string
}

export function CreateBookmark({ courseClassId }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="icon">
          <span className="sr-only">Nuevo</span>
          <BookmarkPlusIcon className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo marcador</DialogTitle>
        </DialogHeader>

        <Content courseClassId={courseClassId} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

function Content({
  courseClassId,
  onClose,
}: {
  courseClassId: string
  onClose: () => void
}) {
  const user = useUser()
  const form = useZodForm({
    schema: schema,
    defaultValues: {
      title: "",
      description: "",
      startAt: { enabled: false, time: "00:00:00" },
      endAt: { enabled: false, time: "00:00:00" },
    },
  })

  const {
    startAt: { enabled: startAtEnabled },
    endAt: { enabled: endAtEnabled },
  } = form.watch()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (input: z.infer<typeof schema>) => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("course_class_bookmarks")
        .insert({
          course_class_id: courseClassId,
          title: input.title,
          description: input.description || null,
          start_at: input.startAt.enabled ? input.startAt.time ?? null : null,
          end_at: input.endAt.enabled ? input.endAt.time ?? null : null,
          user_id: user!.id,
        })
        .select("*")

      if (error) throw error

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: useBookmarksQuery.key({ courseClassId }),
      })
      onClose()
    },
  })

  if (!user) return null

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((input) => mutation.mutate(input))}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <FormField
              control={form.control}
              name="startAt.enabled"
              render={({ field }) => (
                <FormItem className="flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      {...field}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      onChange={undefined}
                      value=""
                      checked={field.value}
                    />
                  </FormControl>

                  <FormLabel>Desde:</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startAt.time"
              render={({ field }) => (
                <FormItem>
                  <FormControl
                    onBlur={() => {
                      const seconds = inputToSeconds(field.value || "")
                      if (typeof seconds === "number")
                        field.onChange(secondsToInput(Math.max(seconds, 0)))

                      form.trigger()
                      field.onBlur()
                    }}
                  >
                    <Input {...field} disabled={!startAtEnabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <FormField
              control={form.control}
              name="endAt.enabled"
              render={({ field }) => (
                <FormItem className="flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      {...field}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      onChange={undefined}
                      value=""
                      checked={field.value}
                    />
                  </FormControl>

                  <FormLabel>Hasta:</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endAt.time"
              render={({ field }) => (
                <FormItem>
                  <FormControl
                    onBlur={() => {
                      const seconds = inputToSeconds(field.value || "")
                      if (typeof seconds === "number")
                        field.onChange(secondsToInput(Math.max(seconds, 0)))

                      form.trigger()
                      field.onBlur()
                    }}
                  >
                    <Input {...field} disabled={!endAtEnabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mutation.error && (
          <Alert variant="destructive">
            <AlertTitle>Error al guardar el marcador</AlertTitle>
            <AlertDescription>{mutation.error?.message}</AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Spinner />}
            Guardar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
