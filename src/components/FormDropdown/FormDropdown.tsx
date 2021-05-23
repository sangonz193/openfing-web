import type { IDropdownProps } from "@fluentui/react"
import { Dropdown } from "@fluentui/react"
import type { Control, ControllerProps, FieldPath } from "react-hook-form"
import { Controller } from "react-hook-form"
import type * as yup from "yup"

import { isFieldRequired } from "../../_utils/isFieldRequired"

export type FormDropdownProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>> = {
	name: TName
	control: Control<TFieldValues>
	dropdownProps: Partial<IDropdownProps> & Pick<IDropdownProps, "options">
	controllerProps?: Partial<ControllerProps<TFieldValues, TName>>
	validationSchema: yup.AnyObjectSchema
}

export const FormDropdown = <TFieldValues extends {}, TName extends FieldPath<TFieldValues>>({
	name,
	control,
	dropdownProps,
	controllerProps,
	validationSchema,
}: FormDropdownProps<TFieldValues, TName>) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
				<Dropdown
					selectedKey={typeof value === "string" ? value : undefined}
					onChange={(_e, option) => {
						onChange(option?.key)
					}}
					onBlur={onBlur}
					errorMessage={error && error.message}
					required={isFieldRequired(validationSchema, name)}
					defaultValue={undefined}
					{...dropdownProps}
				/>
			)}
			{...controllerProps}
		/>
	)
}
