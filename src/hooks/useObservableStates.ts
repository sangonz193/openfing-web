import { useObservableState } from "observable-hooks"
import React from "react"
import type { Observable } from "rxjs"

export const useObservableStates = <TStore extends {}, TKeys extends keyof TStore>(
	store: TStore,
	keys: TKeys[]
): { [K in TKeys]: TStore[K] extends Observable<infer TValue> ? TValue : never } => {
	const result: {
		[K in keyof typeof store]: (typeof store)[K] extends Observable<infer TValue> ? TValue : never
	} = {} as any
	const values = keys.map((key) => {
		const observable = store[key]

		const value = useObservableState(observable as any, (observable as any).getValue())
		result[key] = value as any

		return value
	})

	return React.useMemo(() => result, values)
}
