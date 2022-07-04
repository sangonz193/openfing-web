import type { ITheme } from "@fluentui/style-utilities"
import { BehaviorSubject } from "rxjs"

import type { ReadonlyBehaviorSubject } from "../../_utils/ReadonlyBehaviorSubject"
import type { ThemeKey } from "../../styles/themes"
import { appearanceLocalStorage } from "./Appearance.storage"

export type AppearanceStoreInitData = {
	themeKey: ThemeKey
	theme: ITheme
}

export class AppearanceStore {
	_themeKey: BehaviorSubject<ThemeKey>
	themeKey: ReadonlyBehaviorSubject<ThemeKey>
	currentTheme: BehaviorSubject<ITheme>

	constructor(initData: AppearanceStoreInitData) {
		const { themeKey, theme } = initData

		this._themeKey = new BehaviorSubject(themeKey)
		this.themeKey = this._themeKey
		this.currentTheme = new BehaviorSubject(theme)
	}

	setTheme(themeKey: ThemeKey) {
		this._themeKey.next(themeKey)
		appearanceLocalStorage.setItem("theme", themeKey)
	}
}
