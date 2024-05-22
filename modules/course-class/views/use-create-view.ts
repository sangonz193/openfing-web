import { useMutation } from "@tanstack/react-query"

import { createClient } from "@/utils/supabase/client"

type Params = {
  userId: string
}

export function useCreateView({ userId }: Params) {
  const mutation = useMutation({
    mutationFn: async ({
      courseClassId,
      seconds,
      total,
    }: {
      courseClassId: string
      seconds: number
      total: number
    }) => {
      const supabase = createClient()
      if (total === 0) throw new Error("Total cannot be 0")

      const progress = Math.round((seconds * 100) / total)
      const intSeconds = Math.floor(seconds)
      const { data, error } = await supabase.from("course_class_view").upsert(
        {
          user_id: userId,
          course_class_id: courseClassId,
          progress,
          updated_at: new Date().toISOString(),
          seconds: intSeconds,
        },
        {
          onConflict: "user_id,course_class_id",
        },
      )

      if (error) {
        console.warn(error)
        throw error
      }

      console.log("Tracked view:", `${intSeconds}s`, `${progress}%`)

      return data
    },
  })

  return mutation
}
