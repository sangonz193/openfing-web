import { useQuery } from "@tanstack/react-query"

import { useUser } from "@/modules/auth/use-user"
import { createClient } from "@/utils/supabase/client"

export function useLastViewsQuery() {
  const userId = useUser()?.id

  const query = useQuery({
    queryKey: ["last-views", userId],
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
              code
            )
          )
          `,
        )
        .eq("user_id", userId)
        .order("created_at", {
          ascending: false,
        })

      if (error) {
        console.warn(error)
        throw error
      }

      return data
    },
  })

  return query
}
