import { createTypedStorage } from "../storage/createTypedStorage"

export type TeachingLocalStorageKeyValue = {
	darkTheme: "dismissed"
}

export const teachingLocalStorage = createTypedStorage<TeachingLocalStorageKeyValue>({
	scope: "teaching",

	sessionStorage: false,

	serializers: {
		darkTheme: ({ value }) => value,
	},

	deserializers: {
		darkTheme: ({ storageValue, deleteItem }) => (storageValue === "dismissed" ? storageValue : deleteItem()),
	},

	keyKeys: {
		darkTheme: 0,
	},
})

export const migrateTeachingLocalStorage = async () => {
	const oldKey = `@of-teaching-darkTheme`
	const value = teachingLocalStorage._untypedStorage.getItem(oldKey)

	if (value === "dismissed") {
		await teachingLocalStorage.setItem("darkTheme", value)
	}
	teachingLocalStorage._untypedStorage.removeItem(oldKey)
}
