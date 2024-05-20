"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { StarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"
import { createClient } from "@/utils/supabase/client"

import { useUser } from "../auth/use-user"

type Props = {
  courseId: string
}

export function MaybeFavoriteButton({ courseId }: Props) {
  const user = useUser()
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ["favorite_courses", courseId, user?.id],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return null as never

      const supabase = createClient()
      const { data, error } = await supabase
        .from("favorite_courses")
        .select("id")
        .eq("course_id", courseId)
        .eq("user_id", user.id)
        .maybeSingle()

      if (error) throw error

      return data?.id || null
    },
  })

  const { isSuccess, data: favoriteId } = query

  const mutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient()
      if (favoriteId) {
        await supabase.from("favorite_courses").delete().eq("id", favoriteId)
      } else {
        await supabase.from("favorite_courses").insert({
          course_id: courseId,
          user_id: user!.id,
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite_courses"] })
    },
  })

  if (!isSuccess) return null

  return (
    <Button
      size="icon"
      className={cn("size-8", mutation.isPending && "animate-pulse")}
      variant="ghost"
      onClick={() => {
        mutation.mutate()
      }}
    >
      <StarIcon
        fill={favoriteId ? "currentColor" : undefined}
        className={cn("size-5 opacity-80", favoriteId && "text-yellow-500")}
      />
    </Button>
  )
}
