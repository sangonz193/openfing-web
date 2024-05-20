import { z } from "zod"

import { inputToSeconds } from "../../share/input-to-seconds"

const videoTimeSchema = z.string().transform((value, ctx) => {
  const startSeconds = inputToSeconds(value)
  if (typeof startSeconds === "number") return startSeconds

  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Valor inválido",
  })

  return z.NEVER
})

export const schema = z
  .object({
    title: z.string().trim().min(1, "Requerido"),
    description: z.string().trim().optional(),
    startAt: z.union([
      z.object({
        enabled: z.union([z.literal(false), z.undefined()]),
        time: z.string().optional(),
      }),
      z.object({
        enabled: z.literal(true),
        time: videoTimeSchema,
      }),
    ]),
    endAt: z.union([
      z.object({
        enabled: z.union([z.literal(false), z.undefined()]),
        time: z.string().optional(),
      }),
      z.object({
        enabled: z.literal(true),
        time: videoTimeSchema,
      }),
    ]),
  })
  .refine((data) => !data.endAt.enabled || data.startAt.enabled, {
    message: "Finalización requiere inicio",
    path: ["startAt", "time"],
  })
  .refine(
    (data) => {
      if (!data.startAt.enabled || !data.endAt.enabled) return true

      return data.startAt.time < data.endAt.time
    },
    {
      message: "Finalización debe ser mayor a inicio",
      path: ["endAt", "time"],
    },
  )
