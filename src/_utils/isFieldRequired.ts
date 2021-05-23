import type * as yup from "yup"

export const isFieldRequired = <TSchema extends yup.ObjectSchema<any>>(
	validationSchema: TSchema,
	fieldName: string
) => {
	return !!validationSchema.fields[fieldName]?.exclusiveTests?.required
}
