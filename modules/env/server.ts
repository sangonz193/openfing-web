/* eslint-disable no-process-env */

import { z } from "zod"

import { clientEnv, clientEnvSchema } from "./client"

const shape = {
  VERCEL_URL: z.string().optional(),
}

const serverEnvSchema = clientEnvSchema.extend(shape)

export const serverEnv = serverEnvSchema.parse({
  ...clientEnv,
  VERCEL_URL: process.env.VERCEL_URL,
} satisfies Record<keyof typeof shape, any>)
