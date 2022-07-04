import { createTypedStorage } from "../../storage/createTypedStorage"

export type AuthStorageKeyValue = {
	refreshToken: string
}

export const authLocalStorage = createTypedStorage<AuthStorageKeyValue>({
	scope: "auth",

	sessionStorage: false,

	serializers: {
		refreshToken: ({ value }) => value,
	},

	deserializers: {
		refreshToken: ({ storageValue, deleteItem }) =>
			typeof storageValue === "string" ? storageValue : deleteItem(),
	},

	keyKeys: {
		refreshToken: 0,
	},
})
