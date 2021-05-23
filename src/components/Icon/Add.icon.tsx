import { registerIcons } from "@fluentui/style-utilities"

function AddIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M256 112v288M400 256H112"
			/>
		</svg>
	)
}

export const ADD_ICON_NAME = "Add"

registerIcons({
	icons: {
		[ADD_ICON_NAME]: <AddIcon />,
	},
})
