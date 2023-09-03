import { RadioGroup } from "@headlessui/react"
import { useCallback, useMemo } from "react"

import { appConfig } from "../../app.config"
import { useAppearanceStore } from "../../appearance"
import { useGoogleAnalyticsPageView } from "../../googleAnalytics/useGoogleAnalyticsPageView"
import { useObservableStates } from "../../hooks/useObservableStates"
import { useScreenTitle } from "../../hooks/useScreenTitle"
import type { ThemeKey } from "../../styles/themes"
import { isThemeKey } from "../../styles/themes"
import { ThemeRadioOption } from "./theme-radio-option"

export function Settings() {
	const title = "Ajustes"
	useScreenTitle(title)
	useGoogleAnalyticsPageView({ title: title })

	const appearanceStore = useAppearanceStore()
	const { themeKey: selectedThemeKey } = useObservableStates(appearanceStore, ["themeKey"])

	const options = useMemo(() => {
		return Object.values({
			auto: { key: "auto", label: "Automático (tema del navegador)" },
			light: { key: "light", label: "Claro" },
			dark: { key: "dark", label: "Oscuro" },
			black: { key: "black", label: "Negro" },
		} satisfies { [K in ThemeKey]: { key: K; label: string } })
	}, [])

	const handleThemeChange = useCallback((value: string) => {
		if (!isThemeKey(value)) {
			return
		}

		appearanceStore.setTheme(value)
	}, [])

	return (
		<div className="flex flex-col p-5 pb-20">
			<span className="text-xl font-bold">Apariencia</span>

			<RadioGroup className="flex flex-col gap-2" value={selectedThemeKey} onChange={handleThemeChange}>
				<RadioGroup.Label className="mt-2 text-base font-semibold text-foreground">Tema</RadioGroup.Label>

				<div className="flex flex-col gap-2">
					{options.map(({ key, label }) => (
						<ThemeRadioOption key={key} themeKey={key} label={label} />
					))}
				</div>
			</RadioGroup>

			<span className="mt-8 text-xl font-bold">Acerca de</span>

			<span className="mt-2 font-semibold">Versión</span>
			<span className="mt-1">{appConfig.version}</span>
		</div>
	)
}
