import type { IDropdownProps } from "@fluentui/react"
import { css, Dropdown, makeStyles } from "@fluentui/react"
import type { Control, ControllerProps, FieldPath } from "react-hook-form"
import type * as yup from "yup"

import { isFieldRequired } from "../_utils/isFieldRequired"
import { registerChevrondownIcon } from "../components/Icon/chevrondown"

registerChevrondownIcon()

export type UseDropdownControllerProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>> = {
	name: TName
	control: Control<TFieldValues>
	dropdownProps: Partial<IDropdownProps> & Pick<IDropdownProps, "options">
	controllerProps?: Partial<ControllerProps<TFieldValues, TName>>
	validationSchema: yup.AnyObjectSchema
}

const useStyles = makeStyles({
	dropdown: {
		".ms-Dropdown-caretDownWrapper": {
			top: 0,
			display: "flex",
			alignItems: "center",
			height: "100%",
			lineHeight: "normal",
		},
	},
})

export function useDropdownControllerProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>>({
	name,
	control,
	dropdownProps,
	controllerProps,
	validationSchema,
}: UseDropdownControllerProps<TFieldValues, TName>): ControllerProps<TFieldValues, TName> {
	const styles = useStyles()

	return {
		name: name,
		control: control,
		render: ({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
			return (
				<Dropdown
					selectedKey={typeof value === "string" ? value : undefined}
					onChange={(_, option) => onChange(option?.key)}
					onBlur={onBlur}
					errorMessage={error && error.message}
					required={isFieldRequired(validationSchema, name)}
					defaultValue={undefined}
					{...dropdownProps}
					className={css(styles.dropdown, dropdownProps.className)}
				/>
			)
		},
		...controllerProps,
	}
}
