import type { ITextFieldProps } from "@fluentui/react"
import { TextField } from "@fluentui/react"
import type { Control, ControllerProps, FieldPath } from "react-hook-form"
import type * as yup from "yup"

import { isFieldRequired } from "../_utils/isFieldRequired"
import { registerCheckmarkIcon } from "../components/Icon/checkmark"

registerCheckmarkIcon()

export type UseTextFieldControllerProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>> = {
	name: TName
	control: Control<TFieldValues>
	textFieldProps?: ITextFieldProps
	controllerProps?: Partial<ControllerProps<TFieldValues, TName>>
	validationSchema: yup.AnyObjectSchema
}

export function useTextFieldControllerProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>>({
	name,
	control,
	textFieldProps,
	controllerProps,
	validationSchema,
}: UseTextFieldControllerProps<TFieldValues, TName>): ControllerProps<TFieldValues, TName> {
	return {
		name: name,
		control: control,
		render: ({ field: { onChange, onBlur, name: fieldName, value }, fieldState: { error } }) => (
			<TextField
				{...textFieldProps}
				onChange={onChange}
				value={value as string}
				onBlur={onBlur}
				name={fieldName}
				errorMessage={error?.message}
				required={isFieldRequired(validationSchema, name)}
			/>
		),
		...controllerProps,
	}
}
