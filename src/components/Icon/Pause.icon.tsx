import { registerIcons } from "@fluentui/style-utilities"

function PauseIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<rect
				x="176"
				y="96"
				width="16"
				height="320"
				stroke="currentColor"
				fill="none"
				strokeWidth={32}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x="320"
				y="96"
				width="16"
				height="320"
				strokeLinecap="round"
				strokeLinejoin="round"
				stroke="currentColor"
				fill="none"
				strokeWidth={32}
			/>
		</svg>
	)
}

export const PAUSE_ICON_NAME = "Pause"

registerIcons({
	icons: {
		[PAUSE_ICON_NAME]: <PauseIcon />,
	},
})
