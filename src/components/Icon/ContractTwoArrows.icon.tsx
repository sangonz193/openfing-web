import { registerIcons } from "@fluentui/style-utilities"

function ContractTwoArrowsIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M416 208L304 208 304 96"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M314.23 197.8L432 80"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M96 304L208 304 208 416"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M197.77 314.2L80 432"
			></path>
		</svg>
	)
}

export const CONTRACT_TWO_ARROWS_ICON_NAME = "ContractTwoArrows"

registerIcons({
	icons: {
		[CONTRACT_TWO_ARROWS_ICON_NAME]: <ContractTwoArrowsIcon />,
	},
})
