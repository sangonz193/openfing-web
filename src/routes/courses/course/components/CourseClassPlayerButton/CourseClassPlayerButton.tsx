import type { IButtonProps } from "@fluentui/react"
import { DefaultButton, FontIcon, Text } from "@fluentui/react"
import React from "react"

import { cn } from "@/lib/cn"

import { useCourseClassPlayerButtonStyles } from "./useCourseClassPlayerButtonStyles"

export type CourseClassPlayerButtonProps = {
	children?: React.ReactChild
	className?: string
	iconName?: string
	text?: string
	buttonProps?: IButtonProps
}

const CourseClassPlayerButtonComponent: React.FC<CourseClassPlayerButtonProps> = ({
	children,
	className,
	iconName,
	text,
	buttonProps,
}) => {
	const styles = useCourseClassPlayerButtonStyles({
		className,
	})

	return (
		<DefaultButton className={styles.wrapper} {...buttonProps}>
			{iconName ? <FontIcon className={styles.icon} iconName={iconName} /> : children}
			{text && <Text className={cn(styles.text, "text-xs")}>{text}</Text>}
		</DefaultButton>
	)
}

export const CourseClassPlayerButton = React.memo(CourseClassPlayerButtonComponent)
