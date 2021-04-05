import { registerIcons } from "@fluentui/style-utilities"

function ReturnUpForwardIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M400 160L464 224 400 288"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M448 224H154c-58.76 0-106 49.33-106 108v20"
			></path>
		</svg>
	)
}

export const RETURN_UP_FORWARD_ICON_NAME = "ReturnUpForward"

registerIcons({
	icons: {
		[RETURN_UP_FORWARD_ICON_NAME]: <ReturnUpForwardIcon />,
	},
})
