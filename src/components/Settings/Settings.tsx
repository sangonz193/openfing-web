import { styled } from "@fluentui/react/lib/Utilities";

import { SettingsBase } from "./Settings.base";
import { getStyles } from "./Settings.styles";
import { SettingsProps, SettingsStyleProps, SettingsStyles } from "./Settings.types";

export const Settings = styled<SettingsProps, SettingsStyleProps, SettingsStyles>(
	SettingsBase,
	getStyles,
	undefined,
	undefined,
	true
);
