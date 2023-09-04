import { CommandBar, SearchBox, Stack } from "@fluentui/react"
import React from "react"
import ResizeDetector from "react-resize-detector"
import { useMediaQuery } from "react-responsive"

import { useLayoutOptions } from "@/components/new-layout/context"

import { ADD_OUTLINE_ICON_NAME } from "../../../../components/Icon/add-outline.generated"
import { CLOSE_OUTLINE_ICON_NAME } from "../../../../components/Icon/close-outline.generated"
import { registerMoreIcon } from "../../../../components/Icon/more"
import { SEARCH_OUTLINE_ICON_NAME } from "../../../../components/Icon/search-outline.generated"
import { useComponentWithProps } from "../../../../hooks/useComponentWithProps"
import { Breakpoint } from "../../../../styles/Breakpoint"
import type { useCoursesStyles } from "./useCoursesStyles"

registerMoreIcon()

export type UseCoursesLayoutOptions = {
	styles: ReturnType<typeof useCoursesStyles>
	setShowCreateCourseForm: (value: boolean) => void
	courseSearch: string
	setCourseSearch: (search: string) => void
	showHeaderRight: boolean
}

export function useCoursesLayoutOptions({
	styles,
	setShowCreateCourseForm,
	courseSearch,
	setCourseSearch,
	showHeaderRight,
}: UseCoursesLayoutOptions) {
	const HeaderTitle = useComponentWithProps(
		({ courseSearch, searchField, searchBoxClearButtonIcon }) => {
			return (
				<Stack className={styles.searchBoxWrapper}>
					<SearchBox
						className={searchField}
						placeholder="Buscar"
						value={courseSearch}
						onChange={(_, v) => setCourseSearch(v || "")}
						iconProps={{ iconName: SEARCH_OUTLINE_ICON_NAME }}
						clearButtonProps={{
							iconProps: {
								iconName: CLOSE_OUTLINE_ICON_NAME,
								className: searchBoxClearButtonIcon,
							},
						}}
					/>
				</Stack>
			)
		},
		{
			courseSearch,
			searchBoxClearButtonIcon: styles.searchBoxClearButtonIcon,
			searchField: styles.searchField,
		}
	)

	const [rightWidth, setRightWidth] = React.useState<number>()
	React.useEffect(() => {
		if (!showHeaderRight) {
			setRightWidth(undefined)
		}
	}, [showHeaderRight])

	const HeaderRight = useComponentWithProps(
		({ commandBarClassName, commandBarOverflowItemButtonClassName }) => {
			return (
				<ResizeDetector handleWidth onResize={setRightWidth}>
					{({ targetRef }) => (
						<div ref={targetRef as React.RefObject<HTMLDivElement>} style={{ height: "100%" }}>
							<CommandBar
								className={commandBarClassName}
								items={[]}
								overflowItems={[
									{
										key: "create_course",
										title: "Crear curso",
										text: "Crear curso",
										iconProps: {
											iconName: ADD_OUTLINE_ICON_NAME,
										},
										className: commandBarOverflowItemButtonClassName,
										onClick: () => {
											setShowCreateCourseForm(true)
										},
									},
								]}
							/>
						</div>
					)}
				</ResizeDetector>
			)
		},
		{
			commandBarClassName: styles.commandBar,
			commandBarOverflowItemButtonClassName: styles.commandBarOverflowItemButton,
		}
	)

	const HeaderLeft = useComponentWithProps(() => {
		const isSm = useMediaQuery({ minWidth: Breakpoint.sm })
		return rightWidth && isSm ? <div style={{ width: rightWidth }} /> : null
	}, {})

	useLayoutOptions({
		headerTitle: HeaderTitle,
		headerRight: showHeaderRight ? HeaderRight : undefined,
		headerLeft: HeaderLeft,
	})
}
