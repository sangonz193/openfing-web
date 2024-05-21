import { useQuery } from "@tanstack/react-query"

import { useUser } from "@/modules/auth/use-user"

import { fetchFavorites } from "../fetch-favorites"

export function useFavoritesQuery() {
  const userId = useUser()?.id
  const query = useQuery({
    queryKey: ["favorites", userId],
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) return null as never
      const data = await fetchFavorites(userId)
      return data
    },
  })

  return query
}
