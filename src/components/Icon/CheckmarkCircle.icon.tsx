import { registerIconAlias, registerIcons } from "@fluentui/style-utilities"

function CheckmarkCircleIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeMiterlimit="10"
				strokeWidth="32"
				d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M352 176L217.6 336 160 272"
			></path>
		</svg>
	)
}

export const CHECKMARK_CIRCLE_ICON_NAME = "Checkmark Circle"

registerIcons({
	icons: {
		[CHECKMARK_CIRCLE_ICON_NAME]: <CheckmarkCircleIcon />,
	},
})
