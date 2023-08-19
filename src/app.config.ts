import * as yup from "yup"

declare const APP_VERSION: string

const { VITE_APP_NAME, VITE_BACKEND_URL, VITE_PUBLIC_URL } = yup
	.object({
		VITE_APP_NAME: yup.string().required(),
		VITE_BACKEND_URL: yup.string().required(),
		VITE_PUBLIC_URL: yup.string().default(""),
	})
	.required()
	.validateSync(import.meta.env)

export const appConfig = {
	name: VITE_APP_NAME,
	shortCodeName: "of",
	production: import.meta.env.PROD,
	backendUrl: VITE_BACKEND_URL,
	version: APP_VERSION,
	storageScope: VITE_PUBLIC_URL.replace(/\/$/, "") || "/",
	historyBasename: VITE_PUBLIC_URL.startsWith("http")
		? new URL(VITE_PUBLIC_URL).pathname
		: VITE_PUBLIC_URL.replace(/\/$/, ""),
	baseUrl: location.origin.replace(/\/$/, ""),
}
