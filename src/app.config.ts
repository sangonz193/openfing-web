import * as yup from "yup"

const { BACKEND_URL, PUBLIC_URL } = yup
	.object({
		BACKEND_URL: yup.string().required(),
		PUBLIC_URL: yup.string().required(),
	})
	.required()
	.validateSync(process.env)

export const appConfig = {
	production: process.env.NODE_ENV === "production",
	backendUrl: BACKEND_URL,
	version: process.env.npm_package_version as string,
	storageScope: PUBLIC_URL.replace(/\/$/, "") || "/",
	historyBasename: PUBLIC_URL.startsWith("http") ? new URL(PUBLIC_URL).pathname : PUBLIC_URL.replace(/\/$/, ""),
	baseUrl: location.origin.replace(/\/$/, ""),
}
