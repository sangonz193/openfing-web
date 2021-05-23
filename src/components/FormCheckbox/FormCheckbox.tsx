import { ICheckboxProps } from "@fluentui/react"
import { Checkbox } from "@fluentui/react"
import { Control, ControllerProps, FieldPath } from "react-hook-form"
import { Controller } from "react-hook-form"
import * as yup from "yup"

import { isFieldRequired } from "../../_utils/isFieldRequired"

export type FormCheckboxProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>> = {
	name: TName
	control: Control<TFieldValues>
	checkboxProps: Partial<ICheckboxProps>
	controllerProps?: Partial<ControllerProps<TFieldValues, TName>>
	validationSchema: yup.AnyObjectSchema
}

export const FormCheckbox = <TFieldValues extends {}, TName extends FieldPath<TFieldValues>>({
	name,
	control,
	checkboxProps,
	controllerProps,
	validationSchema,
}: FormCheckboxProps<TFieldValues, TName>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<Checkbox
					checked={!!value}
					onChange={(_, checked) => onChange(checked)}
					required={isFieldRequired(validationSchema, name)}
					{...checkboxProps}
				/>
			)}
			{...controllerProps}
		/>
	)
}
