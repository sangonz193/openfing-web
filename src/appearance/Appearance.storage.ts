import { createTypedStorage } from "../storage/createTypedStorage"
import type { ThemeKey } from "../styles/themes"
import { isThemeKey } from "../styles/themes"

export type AppearanceStorageKeyValue = {
	theme: ThemeKey
}

export const appearanceLocalStorage = createTypedStorage<AppearanceStorageKeyValue>({
	scope: "appareance",

	sessionStorage: false,

	serializers: {
		theme: ({ value }) => value,
	},

	deserializers: {
		theme: ({ storageValue, deleteItem }) => (isThemeKey(storageValue) ? storageValue : deleteItem()),
	},

	keyKeys: {
		theme: 0,
	},
})

export const migrateAppearanceLocalStorage = async () => {
	const oldKey = `@of-theme`
	const value: string | null = appearanceLocalStorage._untypedStorage.getItem(oldKey)

	if (typeof value === "string" && isThemeKey(value)) {
		await appearanceLocalStorage.setItem("theme", value)
	}
	appearanceLocalStorage._untypedStorage.removeItem(oldKey)
}
