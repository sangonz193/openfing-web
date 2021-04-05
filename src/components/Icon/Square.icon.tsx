import { registerIcons } from "@fluentui/style-utilities";

function SquareIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
		</svg>
	);
}

export const SQUARE_ICON_NAME = "Square";

registerIcons({
	icons: {
		[SQUARE_ICON_NAME]: <SquareIcon />,
	},
});
