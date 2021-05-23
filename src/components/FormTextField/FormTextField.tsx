import { ITextFieldProps } from "@fluentui/react"
import { TextField } from "@fluentui/react"
import { Control, ControllerProps, FieldPath } from "react-hook-form"
import { Controller } from "react-hook-form"
import * as yup from "yup"

import { isFieldRequired } from "../../_utils/isFieldRequired"

export type FormTextFieldProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>> = {
	name: TName
	control: Control<TFieldValues>
	textFieldProps?: ITextFieldProps
	controllerProps?: Partial<ControllerProps<TFieldValues, TName>>
	validationSchema: yup.AnyObjectSchema
}

export const FormTextField = <TFieldValues extends {}, TName extends FieldPath<TFieldValues>>({
	name,
	control,
	textFieldProps,
	controllerProps,
	validationSchema,
}: FormTextFieldProps<TFieldValues, TName>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, name: fieldName, value }, fieldState: { error } }) => (
				<TextField
					{...textFieldProps}
					onChange={onChange}
					value={value as string}
					onBlur={onBlur}
					name={fieldName}
					errorMessage={error?.message}
					required={isFieldRequired(validationSchema, name)}
				/>
			)}
			defaultValue=""
			{...controllerProps}
		/>
	)
}
