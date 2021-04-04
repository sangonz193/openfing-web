import { registerIcons } from "@fluentui/style-utilities"

function TimeIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeMiterlimit="10"
				strokeWidth="32"
				d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M256 128L256 272 352 272"
			></path>
		</svg>
	)
}

export const TIME_ICON_NAME = "Time"

registerIcons({
	icons: {
		[TIME_ICON_NAME]: <TimeIcon />,
	},
})
