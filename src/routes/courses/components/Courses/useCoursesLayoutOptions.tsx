import { CommandBar, SearchBox } from "@fluentui/react"
import React from "react"
import ResizeDetector from "react-resize-detector"
import { useMediaQuery } from "react-responsive"

import { Container } from "../../../../components/Container"
import { ADD_ICON_NAME } from "../../../../components/Icon/Add.icon"
import { CANCEL_ICON_NAME } from "../../../../components/Icon/Cancel.icon"
import { SEARCH_ICON_NAME } from "../../../../components/Icon/Search.icon"
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { Breakpoint } from "../../../../styles/Breakpoint"
import { useCoursesStyles } from "./useCoursesStyles"

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
	const searchBox = React.useMemo(() => {
		return (
			<Container className={styles.searchBoxWrapper}>
				<SearchBox
					className={styles.searchField}
					placeholder="Buscar"
					value={courseSearch}
					onChange={(_, v) => setCourseSearch(v || "")}
					iconProps={{ iconName: SEARCH_ICON_NAME }}
					clearButtonProps={{
						iconProps: {
							iconName: CANCEL_ICON_NAME,
							className: styles.searchBoxClearButtonIcon,
						},
					}}
				/>
			</Container>
		)
	}, [styles.searchField, courseSearch, styles.searchBoxClearButtonIcon])

	const [rightWidth, setRightWidth] = React.useState<number>()
	React.useEffect(() => {
		if (!showHeaderRight) {
			setRightWidth(undefined)
		}
	}, [showHeaderRight])

	const headerRight = React.useMemo(() => {
		return (
			<ResizeDetector handleWidth onResize={setRightWidth}>
				{({ targetRef }) => (
					<div ref={targetRef as React.RefObject<HTMLDivElement>} style={{ height: "100%" }}>
						<CommandBar
							className={styles.commandBar}
							items={[]}
							overflowItems={[
								{
									key: "create_course",
									title: "Crear curso",
									text: "Crear curso",
									iconProps: {
										iconName: ADD_ICON_NAME,
									},
									className: styles.commandBarOverflowItemButton,
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
	}, [styles.commandBar, styles.commandBarOverflowItemButton])

	const isSm = useMediaQuery({ minWidth: Breakpoint.sm })

	useLayoutOptions({
		headerTitle: searchBox,
		headerRight: showHeaderRight ? headerRight : null,
		headerLeft: React.useMemo(() => (rightWidth && isSm ? <div style={{ width: rightWidth }} /> : null), [
			rightWidth,
			isSm,
		]),
	})
}
