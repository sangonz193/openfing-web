import { BookmarkPlusIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Spinner } from "@/components/spinner"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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
import { cn } from "@/utils/cn"
import { useZodForm } from "@/utils/react-hook-form/useZodForm"

import { schema } from "./schema"
import { TimeField } from "./time-field"
import { useCreateBookmark } from "./use-mutation"
import { useCourseClassVideo } from "./use-pause-course-class-video"
import { getVideoUrl } from "../../get-video-url"
import { inputToSeconds, secondsToInput } from "../../share/input-to-seconds"

type Props = {
  courseClassId: string
  courseClassNumber: string
  courseClassListCode: string
}

export function CreateBookmark({
  courseClassId,
  courseClassNumber,
  courseClassListCode,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-auto" size="icon">
          <span className="sr-only">Nuevo</span>
          <BookmarkPlusIcon className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[95%] overflow-auto">
        <DialogHeader>
          <DialogTitle>Nuevo marcador</DialogTitle>
        </DialogHeader>

        <Content
          courseClassId={courseClassId}
          onClose={() => setOpen(false)}
          courseClassNumber={courseClassNumber}
          courseClassListCode={courseClassListCode}
        />
      </DialogContent>
    </Dialog>
  )
}

function Content({
  courseClassId,
  onClose,
  courseClassListCode,
  courseClassNumber,
}: {
  courseClassId: string
  onClose: () => void
  courseClassNumber: string
  courseClassListCode: string
}) {
  useCourseClassVideo()

  const videoRef = useRef<HTMLVideoElement>(null)
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

  const mutation = useCreateBookmark({
    courseClassId,
    onSuccess: onClose,
  })

  const [linkedTimeField, setLinkedTimeField] = useState<"startAt" | "endAt">()

  useEffect(() => {
    if (startAtEnabled) setLinkedTimeField("startAt")
    else if (linkedTimeField === "startAt") setLinkedTimeField(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startAtEnabled])
  useEffect(() => {
    if (endAtEnabled) setLinkedTimeField("endAt")
    else if (linkedTimeField === "endAt") setLinkedTimeField(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endAtEnabled])
  useEffect(() => {
    if (!videoRef.current) return
    const video = videoRef.current

    if (linkedTimeField === "startAt") {
      const seconds = inputToSeconds(form.getValues("startAt.time") ?? "")
      if (seconds !== undefined) video.currentTime = seconds
    } else if (linkedTimeField === "endAt") {
      const seconds = inputToSeconds(form.getValues("endAt.time") ?? "")
      if (seconds !== undefined) video.currentTime = seconds
    }
  }, [form, linkedTimeField])

  useEffect(() => {
    if (!videoRef.current || !linkedTimeField) return
    const video = videoRef.current

    const enabled = {
      startAt: startAtEnabled,
      endAt: endAtEnabled,
    }[linkedTimeField]

    if (!enabled) return

    const handler = () => {
      form.setValue(
        `${linkedTimeField}.time`,
        secondsToInput(Math.floor(video.currentTime)),
      )
    }

    video.addEventListener("timeupdate", handler)
    video.addEventListener("seeking", handler)
    return () => {
      video.removeEventListener("timeupdate", handler)
      video.removeEventListener("seeking", handler)
    }
  }, [endAtEnabled, form, linkedTimeField, startAtEnabled])

  const videoUrl = getVideoUrl({
    number: courseClassNumber,
    code: courseClassListCode,
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

        <div className="grid grid-cols-2 gap-x-4">
          <TimeField
            input="startAt"
            linked={linkedTimeField === "startAt"}
            videoRef={videoRef}
            onLinkedChange={(linked) => {
              setLinkedTimeField(linked ? "startAt" : undefined)
            }}
          />
          <TimeField
            input="endAt"
            linked={linkedTimeField === "endAt"}
            videoRef={videoRef}
            onLinkedChange={(linked) => {
              setLinkedTimeField(linked ? "endAt" : undefined)
            }}
          />

          <div
            className={cn(
              "col-span-full rounded-md p-2 pt-5",
              !!linkedTimeField && "bg-foreground/5",
              linkedTimeField === "startAt" && "rounded-tl-none",
              linkedTimeField === "endAt" && "rounded-tr-none",
            )}
          >
            <video
              ref={videoRef}
              controls
              className={cn(
                "aspect-video rounded-md bg-black",

                // https://stackoverflow.com/questions/20037784/html5-video-border-radius-in-chrome-not-working
                "[-webkit-mask-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC)]",
              )}
            >
              <source src={videoUrl} />
            </video>
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
