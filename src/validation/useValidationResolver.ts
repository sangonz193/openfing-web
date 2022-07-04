import type { AsyncOnlyValidator } from "@sangonz193/ts-validation"
import type { ObjectAsyncError, ObjectAsyncFromShape } from "@sangonz193/ts-validation/objectAsync"
import type { TransformObjectMap } from "@sangonz193/utils"
import { dangerousEntriesOf, transformObject } from "@sangonz193/utils"
import { useCallback } from "react"
import type { DeepMap, FieldError, Resolver } from "react-hook-form"

// TODO: Support nested objects
export function useValidationResolver<TFieldValues extends {}>(
	getValidationSchema: (
		data: unknown
	) => AsyncOnlyValidator<unknown, ObjectAsyncFromShape<TFieldValues>, ObjectAsyncError<TFieldValues>>,
	errorMessagesMap: TransformObjectMap<
		Exclude<ObjectAsyncError<TFieldValues>["errors"], undefined>,
		{ [K in keyof Exclude<ObjectAsyncError<TFieldValues>["errors"], undefined>]: string | undefined }
	>
): Resolver<TFieldValues> {
	return useCallback<Resolver<TFieldValues, {}>>(
		async (data) => {
			const response = await getValidationSchema(data).validate(data || {})
			if (response.success) {
				return {
					values: response.value,
					errors: {},
				}
			}

			if (!response.errors[0]?.errors) {
				alert("Ha ocurrido un error inesperado.")
				throw new Error()
			}

			const errors = response.errors[0].errors
			const messages = transformObject(errors, errorMessagesMap)
			const deepMap: DeepMap<TFieldValues, FieldError> = {}

			for (const entry of dangerousEntriesOf(messages)) {
				const message = entry[1]

				if (!message) {
					continue
				}

				deepMap[entry[0] as keyof typeof errors] = {
					type: "validation",
					message: message,
				} as any
			}

			return {
				values: {},
				errors: deepMap,
			}
		},
		[getValidationSchema]
	)
}
