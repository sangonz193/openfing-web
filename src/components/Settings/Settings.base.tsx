import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupProps } from "@fluentui/react/lib/ChoiceGroup";
import { Label } from "@fluentui/react/lib/Label";
import { Stack } from "@fluentui/react/lib/Stack";
import { Text } from "@fluentui/react/lib/Text";
import { classNamesFunction } from "@fluentui/react/lib/Utilities";
import identity from "lodash/identity";
import React from "react";
import { appConfig } from "src/appConfig";
import { useDocumentTitle } from "src/hooks/useDocumentTitle";
import { useObserveProperties } from "src/hooks/useObserveProperties";
import { isThemeKey, ThemeKey } from "src/style/themes";

import { useLayoutOptions } from "../../_utils/useLayoutOptions";
import { useAppearanceStore } from "../../modules/Appearance";
import { SettingsProps, SettingsStyleProps, SettingsStyles } from "./Settings.types";

const getClassNames = classNamesFunction<SettingsStyleProps, SettingsStyles>();

export const SettingsBase = (props: SettingsProps) => {
	const { styles, theme } = props as Required<Pick<typeof props, "styles" | "theme">>;
	const classNames = getClassNames(styles, { theme });

	useDocumentTitle("Ajustes - OpenFING");
	useLayoutOptions(
		React.useCallback(
			() => ({
				header: {
					title: "Ajustes",
				},
			}),
			[]
		)
	);

	const appearanceStore = useAppearanceStore();
	const { themeKey: selectedThemeKey } = useObserveProperties(appearanceStore, ["themeKey"]);
	const options = React.useMemo<Array<Omit<IChoiceGroupOption, "key"> & { key: ThemeKey }>>(
		() =>
			Object.values(
				identity<{ [K in ThemeKey]: { key: K; text: string } }>({
					auto: { key: "auto", text: "Automático (tema del navegador)" },
					light: { key: "light", text: "Claro" },
					dark: { key: "dark", text: "Oscuro" },
					black: { key: "black", text: "Negro" },
				})
			),
		[]
	);

	const handleThemeChange = React.useCallback<Exclude<IChoiceGroupProps["onChange"], undefined>>((ev, option) => {
		if (option?.key && isThemeKey(option.key)) appearanceStore.setTheme(option.key);
	}, []);

	return (
		<Stack className={classNames.root} data-is-scrollable tokens={{ childrenGap: 40 }} disableShrink>
			<Stack className={classNames.appearanceSection} tokens={{ childrenGap: 10 }}>
				<Text variant="xLarge">Apariencia</Text>

				<Stack horizontal>
					<ChoiceGroup
						selectedKey={selectedThemeKey}
						options={options}
						onChange={handleThemeChange}
						label="Tema"
					/>
				</Stack>
			</Stack>

			<Stack className={classNames.aboutSection} tokens={{ childrenGap: 10 }}>
				<Text variant="xLarge">Acerca de</Text>

				<Stack horizontal>
					<div>
						<Label>Versión</Label>
						<Text>{appConfig.version}</Text>
					</div>
				</Stack>
			</Stack>
		</Stack>
	);
};
