import { createTypedStorage } from "../../storage/createTypedStorage"

export type BlogStorageKeyValue = {
	enabled: boolean
}

export const blogLocalStorage = createTypedStorage<BlogStorageKeyValue>({
	scope: "blog",

	sessionStorage: false,

	serializers: {
		enabled: ({ value }) => value.toString(),
	},

	deserializers: {
		enabled: ({ storageValue, deleteItem }) => (storageValue ? storageValue === "true" : deleteItem()),
	},

	keyKeys: {
		enabled: 0,
	},
})

export const migrateBlogLocalStorage = async () => {}
