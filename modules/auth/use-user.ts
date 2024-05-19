import { useAuthContext } from "./provider/client"

export function useUser() {
  return useAuthContext().user
}
