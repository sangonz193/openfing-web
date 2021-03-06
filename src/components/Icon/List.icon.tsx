import { registerIcons } from "@fluentui/style-utilities"

function ListIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<line
				x1="160"
				y1="144"
				x2="448"
				y2="144"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={32}
			/>
			<line
				x1="160"
				y1="256"
				x2="448"
				y2="256"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={32}
			/>
			<line
				x1="160"
				y1="368"
				x2="448"
				y2="368"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={32}
			/>
			<circle
				cx="80"
				cy="144"
				r="16"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={32}
			/>
			<circle
				cx="80"
				cy="256"
				r="16"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={32}
			/>
			<circle
				cx="80"
				cy="368"
				r="16"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={32}
			/>
		</svg>
	)
}

export const LIST_ICON_NAME = "List"

registerIcons({
	icons: {
		[LIST_ICON_NAME]: <ListIcon />,
	},
})
