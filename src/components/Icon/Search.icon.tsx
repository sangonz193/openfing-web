import { registerIcons } from "@fluentui/style-utilities";

function SearchIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
			<path
				fill="none"
				stroke="currentColor"
				strokeMiterlimit="10"
				strokeWidth="32"
				d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
			></path>
			<path
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeMiterlimit="10"
				strokeWidth="32"
				d="M338.29 338.29L448 448"
			></path>
		</svg>
	);
}

export const SEARCH_ICON_NAME = "Search";

registerIcons({
	icons: {
		[SEARCH_ICON_NAME]: <SearchIcon />,
	},
});
