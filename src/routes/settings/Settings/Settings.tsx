import { ChoiceGroup, IChoiceGroupOption, IChoiceGroupProps, Label, Stack, Text } from "@fluentui/react"
import identity from "lodash/identity"
import React from "react"

import { Div } from "../../../components/Div"
import { useLayoutOptions } from "../../../components/Layout/useLayoutOptions"
import { appConfig } from "../../../config/app.config"
import { useDocumentTitle } from "../../../hooks/useDocumentTitle"
import { useReactiveVars } from "../../../hooks/useReactiveVars"
import { useAppearanceStore } from "../../../modules/Appearance"
import { isThemeKey, ThemeKey } from "../../../styles/themes"
import { useSettingsStyles } from "./useSettingsStyles"

export type SettingsProps = {
	children?: undefined
}

const SettingsComponent: React.FC<SettingsProps> = () => {
	const styles = useSettingsStyles()

	useDocumentTitle("Ajustes - OpenFING")
	useLayoutOptions({
		headerTitle: "Ajustes",
	})

	const appearanceStore = useAppearanceStore()
	const { themeKey: selectedThemeKey } = useReactiveVars(appearanceStore, ["themeKey"])

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
	)

	const handleThemeChange = React.useCallback<Exclude<IChoiceGroupProps["onChange"], undefined>>((_, option) => {
		if (option?.key && isThemeKey(option.key)) {
			appearanceStore.setTheme(option.key)
		}
	}, [])

	return (
		<Stack className={styles.wrapper} data-is-scrollable tokens={{ childrenGap: 40 }} disableShrink>
			<Stack className={styles.appearanceSection} tokens={{ childrenGap: 10 }}>
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

			<Stack className={styles.aboutSection} tokens={{ childrenGap: 10 }}>
				<Text variant="xLarge">Acerca de</Text>

				<Stack horizontal>
					<Div>
						<Label>Versión</Label>
						<Text>{appConfig.version}</Text>
					</Div>
				</Stack>
			</Stack>
		</Stack>
	)
}

export const Settings = React.memo(SettingsComponent)
