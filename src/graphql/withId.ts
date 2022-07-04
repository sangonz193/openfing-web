import { hasProperty } from "@sangonz193/utils/hasProperty"
import type { Entity, Resolver } from "@urql/exchange-graphcache"

import type { QueryCourseByCodeArgs } from "./remoteSchema.types"

export function withIdAndPartialShape<TResult extends { __typename: string; id: string }>(
	handler: (
		result: Pick<TResult, "__typename" | "id"> &
			Partial<Record<Exclude<keyof TResult, "__typename" | "id">, unknown>>
	) => Entity | undefined
): Resolver<{}, QueryCourseByCodeArgs, Entity | undefined> {
	return (_, args, cache) => {
		for (const value of ((cache as any).data.records.base as Map<string, unknown>).values()) {
			if (typeof value !== "object" || !value) {
				continue
			}

			if (
				!hasProperty(value, "__typename") ||
				value.__typename !== "Course" ||
				!hasProperty(value, "id") ||
				typeof value.id !== "string" ||
				!hasProperty(value, "code") ||
				typeof value.code !== "string" ||
				value.code !== args.code
			) {
				continue
			}

			return handler({
				...value,
				__typename: value.__typename,
				id: value.id,
			} as any)
		}

		return null
	}
}
