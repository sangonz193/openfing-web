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
	storageScope: PUBLIC_URL,
	historyBasename: process.env.PUBLIC_URL as string,
	baseUrl: (location.origin + process.env.PUBLIC_URL).replace(/\/$/, ""),
}
