import { AuthProvider } from "@/modules/auth/provider/server"
import { compactProviders } from "@/utils/react/compact-providers"
import { ReactQueryProvider } from "@/utils/react-query/provider"

export const Providers = compactProviders([ReactQueryProvider, AuthProvider])
