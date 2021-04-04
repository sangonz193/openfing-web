import { registerIcons } from "@fluentui/style-utilities";

function ResizeIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M304 96L416 96 416 208"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M405.77 106.2L111.98 400.02"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M208 416L96 416 96 304"
			></path>
		</svg>
	);
}

export const RESIZE_ICON_NAME = "Resize";

registerIcons({
	icons: {
		[RESIZE_ICON_NAME]: <ResizeIcon />,
	},
});
