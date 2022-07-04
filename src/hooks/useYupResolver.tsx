import { yupResolver } from "@hookform/resolvers/yup"
import React from "react"
import type { FieldValues, ResolverOptions, ResolverResult, UnpackNestedValue } from "react-hook-form"
import type * as yup from "yup"
import type Lazy from "yup/lib/Lazy"

export function useYupResolver<T extends yup.AnyObjectSchema | Lazy<any>>(
	validationSchema: T
): <TFieldValues extends FieldValues, TContext>(
	values: UnpackNestedValue<TFieldValues>,
	context: TContext | undefined,
	options: ResolverOptions<TFieldValues>
) => Promise<ResolverResult<TFieldValues>> {
	return React.useMemo(() => yupResolver(validationSchema), [validationSchema])
}
