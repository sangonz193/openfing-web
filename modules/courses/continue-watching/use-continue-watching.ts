import { useQuery } from "@tanstack/react-query"

import { useUser } from "@/modules/auth/use-user"
import { createClient } from "@/utils/supabase/client"

export function useContinueWatchingQuery() {
  const userId = useUser()?.id

  const query = useQuery({
    queryKey: ["continue-watching", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null as never

      const supabase = createClient()

      const { data, error } = await supabase
        .from("course_class_view")
        .select(
          `
          id,
          seconds,
          progress,
          course_classes(
            id,
            name,
            number,
            course_class_lists(
              id,
              code,
              course_editions(
                id,
                courses(
                  id,
                  name
                )
              )
            )
          )
          `,
        )
        .eq("user_id", userId)
        .order("updated_at", {
          ascending: false,
        })
        .limit(6)

      if (error) {
        console.warn(error.message)
        throw error
      }

      return data
    },
  })

  return query
}
