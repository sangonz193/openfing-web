import { CommandBar, CommandBarButton } from "@fluentui/react"

import { ADD_OUTLINE_ICON_NAME } from "../../../../components/Icon/add-outline.generated"
import { useLayoutOptions } from "../../../../components/Layout/useLayoutOptions"
import { useComponentWithProps } from "../../../../hooks/useComponentWithProps"
import { useObservableStates } from "../../../../hooks/useObservableStates"
import { useAuthStore } from "../../../../modules/Auth"
import type { useBlogStyles } from "./useBlogStyles"

export type UseBlogLayoutOptionsInput = {
	title: string
	styles: ReturnType<typeof useBlogStyles>
	onCreatePost: () => void
}

export function useBlogLayoutOptions({ title, styles, onCreatePost }: UseBlogLayoutOptionsInput) {
	const { grant } = useObservableStates(useAuthStore(), ["grant"])
	const HeaderRight = useComponentWithProps(
		({ styles, grant, onCreatePost }) => {
			if (!grant) {
				return null
			}

			return (
				<div style={{ height: "100%" }}>
					<CommandBar
						className={styles.commandBar}
						items={[]}
						overflowButtonAs={(props) => (
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							<CommandBarButton {...props} menuProps={{ ...props.menuProps!, isBeakVisible: false }} />
						)}
						overflowItems={[
							{
								key: "create_post",
								title: "Crear post",
								text: "Crear post",
								iconProps: {
									iconName: ADD_OUTLINE_ICON_NAME,
								},
								className: styles.commandBarOverflowItemButton,
								onClick: onCreatePost,
							},
						]}
					/>
				</div>
			)
		},
		{
			styles,
			grant,
			onCreatePost,
		}
	)

	useLayoutOptions({
		headerTitle: title,
		headerRight: HeaderRight,
	})
}
