import { registerIcons } from "@fluentui/style-utilities";

function LandscapeIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<rect
				x="80"
				y="16"
				width="352"
				height="480"
				rx="48"
				ry="48"
				transform="rotate(-90 256 256)"
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
			/>
		</svg>
	);
}

export const LANDSCAPE_ICON_NAME = "Landscape";

registerIcons({
	icons: {
		[LANDSCAPE_ICON_NAME]: <LandscapeIcon />,
	},
});
