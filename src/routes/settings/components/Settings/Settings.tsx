import type { IChoiceGroupOption, IChoiceGroupProps } from "@fluentui/react"
import { ChoiceGroup, Label, Stack, Text } from "@fluentui/react"
import identity from "lodash/identity"
import React from "react"

import { appConfig } from "../../../../app.config"
import { useObservableStates } from "../../../../hooks/useObservableStates"
import { useScreenTitle } from "../../../../hooks/useScreenTitle"
import { useAppearanceStore } from "../../../../modules/Appearance"
import { useGoogleAnalyticsPageView } from "../../../../modules/GoogleAnalytics/useGoogleAnalyticsPageView"
import { useHistory } from "../../../../modules/Navigation/useHistory"
import type { ThemeKey } from "../../../../styles/themes"
import { isThemeKey } from "../../../../styles/themes"
import { loginRouteConfig } from "../../../login/login.route.config"
import { useSettingsStyles } from "./useSettingsStyles"

export type SettingsProps = {
	children?: undefined
}

const SettingsComponent: React.FC<SettingsProps> = () => {
	const title = "Ajustes"
	useScreenTitle(title)
	useGoogleAnalyticsPageView({ title: title })

	const styles = useSettingsStyles()

	const appearanceStore = useAppearanceStore()
	const { themeKey: selectedThemeKey } = useObservableStates(appearanceStore, ["themeKey"])

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

	const history = useHistory()

	return (
		<Stack className={styles.wrapper} data-is-scrollable tokens={{ childrenGap: 40 }} disableShrink>
			<Stack className={styles.appearanceSection} tokens={{ childrenGap: 10 }}>
				<Text variant="xLarge" onDoubleClick={() => history.push(loginRouteConfig.path)}>
					Apariencia
				</Text>

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
					<Stack>
						<Label>Versión</Label>
						<Text>{appConfig.version}</Text>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	)
}

export const Settings = React.memo(SettingsComponent)
