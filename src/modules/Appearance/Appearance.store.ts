import { makeVar, ReactiveVar } from "@apollo/client";

import { ThemeKey } from "../../style/themes";
import { appearanceLocalStorage } from "./Appearance.storage";

export type AppearanceStoreInitData = {
	themeKey: ThemeKey;
};

export class AppearanceStore {
	themeKey: ReactiveVar<ThemeKey>;

	constructor(initData: AppearanceStoreInitData) {
		const { themeKey } = initData;

		this.themeKey = makeVar(themeKey);
	}

	setTheme(themeKey: ThemeKey) {
		this.themeKey(themeKey);
		appearanceLocalStorage.setItem("theme", themeKey);
	}
}
