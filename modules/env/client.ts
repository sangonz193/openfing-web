/* eslint-disable no-process-env */

import { z } from "zod"

const shape = {
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
} satisfies Record<`NEXT_PUBLIC_${string}`, any>

export const clientEnvSchema = z.object(shape)

export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
} satisfies Record<keyof typeof shape, any>)
