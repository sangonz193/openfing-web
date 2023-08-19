import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import type { FieldPath, UseFormSetError } from "react-hook-form"

export function setFormErrorMessages<TFieldValues extends Record<string, any>>(
	fieldErrors: Record<FieldPath<TFieldValues>, string | undefined>,
	setError: UseFormSetError<TFieldValues>
): boolean {
	let result = false
	dangerousKeysOf(fieldErrors).forEach((fieldName) => {
		const errorMessage = fieldErrors[fieldName]

		if (errorMessage) {
			result = true
			setError(fieldName, { message: errorMessage })
		}
	})

	return result
}
