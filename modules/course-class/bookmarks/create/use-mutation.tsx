import { useMutation, useQueryClient } from "@tanstack/react-query"
import { z } from "zod"

import { useUser } from "@/modules/auth/use-user"
import { createClient } from "@/utils/supabase/client"

import { schema } from "./schema"
import { useBookmarksQuery } from "../use-bookmarks"

type Params = {
  courseClassId: string
  onSuccess: () => void
}

export function useCreateBookmark({ courseClassId, onSuccess }: Params) {
  const user = useUser()
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
      onSuccess()
    },
  })

  return mutation
}
