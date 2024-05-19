"use client"

import { CheckIcon, CopyIcon, ShareIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { useWatch } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
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
import { useZodForm } from "@/utils/react-hook-form/useZodForm"

import { formSchema } from "./form-schema"
import { inputToSeconds, secondsToInput } from "./input-to-seconds"

export function ShareCourseClass() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ShareIcon className="size-4" />
          Compartir
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Compartir</DialogTitle>
        </DialogHeader>

        <Content />
      </DialogContent>
    </Dialog>
  )
}

function Content() {
  const pathname = usePathname()
  const form = useZodForm({
    schema: formSchema,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      startAtEnabled: false,
      startAt: "00:00:00",
      endAtEnabled: false,
      endAt: "00:00:00",
    },
  })

  const { startAt, endAtEnabled, endAt, startAtEnabled } = useWatch({
    control: form.control,
  })
  const startAtSeconds = startAt && inputToSeconds(startAt)
  const endAtSeconds = endAt && inputToSeconds(endAt)

  const url = useMemo(() => {
    const url = new URL(pathname, location.origin).href
    if (!startAtSeconds && !endAtSeconds) return url.toString()

    let result = url.toString() + `#t=`
    result += startAtSeconds ?? 0
    if (endAtSeconds) result += `,${endAtSeconds}`

    return result
  }, [pathname, startAtSeconds, endAtSeconds])

  const [copied, setCopied] = useState(0)
  useEffect(() => {
    if (!copied) return

    const timeout = setTimeout(() => {
      setCopied(0)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [copied])

  const Icon = copied ? CheckIcon : CopyIcon

  return (
    <Form {...form}>
      <div className="flex flex-col gap-3">
        <div className="mb-4 flex">
          <Input value={url} readOnly className="rounded-e-none" />
          <Button
            size="icon"
            className="rounded-s-none"
            onClick={() =>
              navigator.clipboard.writeText(url).then(() => {
                setCopied(copied + 1)
              })
            }
          >
            <span className="sr-only">Copy</span>
            <Icon className="size-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-1.5">
          <FormField
            control={form.control}
            name="startAtEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    {...field}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    onChange={undefined}
                    value=""
                    checked={field.value}
                  />
                </FormControl>

                <FormLabel>Iniciar en:</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startAt"
            render={({ field }) => (
              <FormItem>
                <FormControl
                  onBlur={() => {
                    const seconds = inputToSeconds(field.value)
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
            name="endAtEnabled"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    {...field}
                    onCheckedChange={(checked) => field.onChange(checked)}
                    onChange={undefined}
                    value=""
                    checked={field.value}
                  />
                </FormControl>

                <FormLabel>Terminar en:</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endAt"
            render={({ field }) => (
              <FormItem>
                <FormControl
                  onBlur={() => {
                    const seconds = inputToSeconds(field.value)
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
    </Form>
  )
}
