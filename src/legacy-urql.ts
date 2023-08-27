import { useMemo } from "react"
import * as Urql from "urql"

import { graphqlConfig } from "./graphql/graphql.config"

export type UseQueryArgs<Variables extends Urql.AnyVariables = Urql.AnyVariables, Data = any> = Urql.UseQueryArgs<
	Variables,
	Data
>

export const useQuery: typeof Urql.useQuery = (props) => {
	return Urql.useQuery({
		...props,
		context: useMemo(
			() => ({
				url: graphqlConfig.uri,
			}),
			[]
		),
	} as any)
}

export const useMutation: typeof Urql.useMutation = Urql.useMutation
