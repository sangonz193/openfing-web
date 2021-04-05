import { registerIconAlias, registerIcons } from "@fluentui/style-utilities";

function CheckmarkIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="32"
				d="M416 128L192 384 96 288"
			></path>
		</svg>
	);
}

export const CHECKMARK_ICON_NAME = "Checkmark";

registerIcons({
	icons: {
		[CHECKMARK_ICON_NAME]: <CheckmarkIcon />,
	},
});

registerIconAlias("checkmark", CHECKMARK_ICON_NAME);
