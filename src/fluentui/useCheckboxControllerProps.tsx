import type { ICheckboxProps } from "@fluentui/react"
import { Checkbox } from "@fluentui/react"
import type { Control, ControllerProps, FieldPath } from "react-hook-form"
import type * as yup from "yup"

import { registerCheckmarkIcon } from "../components/Icon/checkmark"
import { isFieldRequired } from "../form/isFieldRequired"

registerCheckmarkIcon()

export type UseCheckboxControlPropsProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>> = {
	name: TName
	control: Control<TFieldValues>
	checkboxProps: Partial<ICheckboxProps>
	controllerProps?: Partial<ControllerProps<TFieldValues, TName>>
	validationSchema: yup.AnyObjectSchema
}

export function useCheckboxControllerProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>>({
	name,
	control,
	checkboxProps,
	controllerProps,
	validationSchema,
}: UseCheckboxControlPropsProps<TFieldValues, TName>): ControllerProps<TFieldValues, TName> {
	return {
		name: name,
		control: control,
		render: ({ field: { onChange, value } }) => (
			<Checkbox
				checked={!!value}
				onChange={(_, checked) => onChange(checked)}
				required={isFieldRequired(validationSchema, name)}
				{...checkboxProps}
			/>
		),
		...controllerProps,
	}
}
