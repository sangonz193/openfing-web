import { z } from "zod"

import { inputToSeconds } from "./input-to-seconds"

export const formSchema = z
  .object({
    startAtEnabled: z.boolean(),
    startAt: z.string(),
    endAtEnabled: z.boolean(),
    endAt: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.startAtEnabled) {
      const startSeconds = inputToSeconds(data.startAt)
      if (startSeconds === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Momento de inicio inválido",
          path: ["startAt"],
        })
        return data
      }
    }

    if (data.endAtEnabled) {
      const endSeconds = inputToSeconds(data.endAt)
      if (endSeconds === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Fin inválido",
          path: ["endAt"],
        })
        return data
      }

      if (data.startAtEnabled && endSeconds <= inputToSeconds(data.startAt)!) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El fin debe ser mayor al inicio",
          path: ["endAt"],
        })
        return data
      }
    }

    return data
  })
