import { ITheme } from "@fluentui/style-utilities";

export function applyThemeOutsideContext(theme: ITheme) {
	document.body.style.backgroundColor = theme.semanticColors.bodyBackground;

	const styleElementId = "@of-custom-styles";
	let customStyleElement = document.getElementById(styleElementId);

	if (!customStyleElement) {
		customStyleElement = document.createElement("style");
		customStyleElement.id = styleElementId;
		document.head.appendChild(customStyleElement);
	}

	const scrollbarTrackColor = theme.palette.neutralLighter;
	const scrollbarThumbColor = theme.palette.neutralQuaternaryAlt;
	customStyleElement.innerHTML =
		`*{scrollbar-width:thin;scrollbar-color:${scrollbarThumbColor}${scrollbarTrackColor};-webkit-overflow-scrolling: auto}\n` +
		`*::-webkit-scrollbar{max-width: 10px}\n` +
		`*::-webkit-scrollbar-track{background:${scrollbarTrackColor}}\n` +
		`*::-webkit-scrollbar-thumb{background-color:${scrollbarThumbColor}}`;
}
