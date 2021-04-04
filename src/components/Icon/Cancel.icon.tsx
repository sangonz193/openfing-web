import { registerIcons } from "@fluentui/style-utilities";

function CancelIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M368 368L144 144"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M368 144L144 368"
			></path>
		</svg>
	);
}

export const CANCEL_ICON_NAME = "Cancel";

registerIcons({
	icons: {
		[CANCEL_ICON_NAME]: <CancelIcon />,
	},
});
