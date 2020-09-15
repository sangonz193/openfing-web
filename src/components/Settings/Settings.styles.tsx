import { SettingsStyleProps, SettingsStyles } from "./Settings.types";

export const getStyles = (props: SettingsStyleProps): SettingsStyles => {
	const { theme } = props;

	const marginLeft = 20;

	return {
		root: {
			flex: 1,
			paddingBottom: 20,

			backgroundColor: theme.semanticColors.bodyBackground,

			overflow: "auto",
		},

		appearanceSection: {
			marginTop: marginLeft,
			marginLeft,
		},

		aboutSection: {
			marginLeft,
		},
	};
};
