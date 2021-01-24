export const appConfig = {
	version: process.env.npm_package_version as string,
	apiUri: process.env.API_CLIENT_URI as string,
	storageScope: process.env.PUBLIC_URL as string,
	historyBasename: process.env.PUBLIC_URL as string,
	baseUrl: (location.origin + process.env.PUBLIC_URL).replace(/\/$/, ""),
};
