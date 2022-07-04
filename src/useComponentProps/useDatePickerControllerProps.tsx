import type { IDatePickerProps } from "@fluentui/react"
import { DatePicker, useTheme } from "@fluentui/react"
import { format, parse } from "date-fns"
import type { Control, ControllerProps, FieldPath } from "react-hook-form"
import type * as yup from "yup"

import { isFieldRequired } from "../_utils/isFieldRequired"
import { CALENDAR_OUTLINE_ICON_NAME } from "../components/Icon/calendar-outline.generated"
import { registerDownIcon } from "../components/Icon/down"
import { registerUpIcon } from "../components/Icon/up"

registerUpIcon()
registerDownIcon()

export type UseDatePickerControllerProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>> = {
	name: TName
	control: Control<TFieldValues>
	datePickerProps: Partial<IDatePickerProps>
	controllerProps?: Partial<ControllerProps<TFieldValues, TName>>
	validationSchema: yup.AnyObjectSchema
}

export function useDatePickerControllerProps<TFieldValues extends {}, TName extends FieldPath<TFieldValues>>({
	name,
	control,
	datePickerProps,
	controllerProps,
	validationSchema,
}: UseDatePickerControllerProps<TFieldValues, TName>): ControllerProps<TFieldValues, TName> {
	const theme = useTheme()

	return {
		name: name,
		control: control,
		render: ({ field: { onChange, value }, fieldState: { error } }) => (
			<DatePicker
				allowTextInput
				ariaLabel="Select a date. Input format is day slash month slash year."
				onSelectDate={(date) => onChange(date)}
				value={value as Date}
				formatDate={(date) => {
					return date ? format(date, "dd/MM/yyyy") : ""
				}}
				calendarProps={{
					calendarMonthProps: {
						styles: { currentItemButton: { color: theme.semanticColors.bodyText } },
					},
				}}
				isRequired={isFieldRequired(validationSchema, name)}
				parseDateFromString={(value) => (value.trim() ? parse(value, "dd/MM/yyyy", new Date()) : null)}
				textField={{
					errorMessage: error?.message,
					iconProps: { iconName: CALENDAR_OUTLINE_ICON_NAME },
				}}
				{...datePickerProps}
			/>
		),
		...controllerProps,
	}
}
