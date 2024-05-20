import { LinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils/cn"
import { useZodFormContext } from "@/utils/react-hook-form/useZodForm"

import { schema } from "./schema"
import { inputToSeconds, secondsToInput } from "../../share/input-to-seconds"

type TimeInput = "startAt" | "endAt"

type Props = {
  input: TimeInput
  linked: boolean
  videoRef: React.RefObject<HTMLVideoElement>
  onLinkedChange: (linked: boolean) => void
}

export function TimeField({ input, linked, videoRef, onLinkedChange }: Props) {
  const form = useZodFormContext<typeof schema>()
  const enabled = form.watch(`${input}.enabled`)

  return (
    <div
      className={cn(
        "relative flex flex-col gap-1.5 rounded-md rounded-b-none p-2 pb-4",
        linked && "bg-foreground/5",
      )}
    >
      <FormField
        control={form.control}
        name={`${input}.enabled`}
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

            <FormLabel>{input === "startAt" ? "Desde" : "Hasta"}:</FormLabel>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`${input}.time`}
        render={({ field }) => (
          <FormItem>
            <FormControl
              onBlur={() => {
                const seconds = inputToSeconds(field.value || "")
                if (typeof seconds === "number")
                  field.onChange(secondsToInput(Math.max(seconds, 0)))

                field.onBlur()
                if (videoRef.current && linked && typeof seconds === "number")
                  videoRef.current.currentTime = seconds
              }}
            >
              <Input {...field} disabled={!enabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {enabled && (
        <div className="absolute bottom-0 left-1/2 size-0 items-center justify-center">
          <Button
            size="icon"
            type="button"
            className=" bottom-0 size-5"
            variant={linked ? undefined : "ghost"}
            onClick={() => onLinkedChange(!linked)}
          >
            <LinkIcon className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
