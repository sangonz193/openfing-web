import { useQuery } from "@tanstack/react-query"

import { createClient } from "@/utils/supabase/client"

type Params = {
  courseClassId: string | undefined
}

export function useBookmarksQuery(params: Params) {
  const query = useQuery({
    queryKey: queryKey(params),
    enabled: !!params.courseClassId,
    queryFn: async () => {
      if (!params.courseClassId) return null as never

      const supabase = createClient()

      const { data, error } = await supabase
        .from("course_class_bookmarks")
        .select("*")
        .eq("course_class_id", params.courseClassId)
        .order("start_at", { nullsFirst: true })
        .order("created_at")

      if (error) {
        throw error
      }

      return data
    },
  })

  return query
}

function queryKey(params: Params) {
  return ["bookmarks", params.courseClassId]
}

useBookmarksQuery.key = queryKey
