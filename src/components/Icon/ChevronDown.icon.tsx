import { registerIcons } from "@fluentui/style-utilities";

function ChevronDownIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="48"
				d="M112 184L256 328 400 184"
			></path>
		</svg>
	);
}

export const CHEVRON_DOWN_ICON_NAME = "ChevronDown";

registerIcons({
	icons: {
		[CHEVRON_DOWN_ICON_NAME]: <ChevronDownIcon />,
	},
});
