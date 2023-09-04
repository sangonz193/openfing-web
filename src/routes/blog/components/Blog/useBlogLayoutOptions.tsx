import { CommandBar, CommandBarButton } from "@fluentui/react"

import { useLayoutOptions } from "@/components/layout/context"

import { useAuthStore } from "../../../../auth"
import { ADD_OUTLINE_ICON_NAME } from "../../../../components/Icon/add-outline.generated"
import { useComponentWithProps } from "../../../../hooks/useComponentWithProps"
import { useObservableStates } from "../../../../hooks/useObservableStates"
import type { useBlogStyles } from "./useBlogStyles"

export type UseBlogLayoutOptionsInput = {
	styles: ReturnType<typeof useBlogStyles>
	onCreatePost: () => void
}

export function useBlogLayoutOptions({ styles, onCreatePost }: UseBlogLayoutOptionsInput) {
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
		headerRight: HeaderRight,
	})
}
