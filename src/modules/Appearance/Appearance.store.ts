import { observable } from "mobx";

import { ThemeKey } from "../../style/themes";
import { appearanceLocalStorage } from "./Appearance.storage";

export type AppearanceStoreInitData = {
	themeKey: ThemeKey;
};

export class AppearanceStore {
	@observable themeKey: ThemeKey;

	constructor(initData: AppearanceStoreInitData) {
		const { themeKey } = initData;

		this.themeKey = themeKey;
	}

	setTheme(themeKey: ThemeKey) {
		this.themeKey = themeKey;
		appearanceLocalStorage.setItem("theme", themeKey);
	}
}
