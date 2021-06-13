import { registerIcons } from "@fluentui/style-utilities"

function ChevronRightIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="48"
				d="M184 112l144 144-144 144"
			/>
		</svg>
	)
}

export const CHEVRON_RIGHT_ICON_NAME = "ChevronRight"

registerIcons({
	icons: {
		[CHEVRON_RIGHT_ICON_NAME]: <ChevronRightIcon />,
	},
})
