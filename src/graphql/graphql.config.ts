import { appConfig } from "../config/app.config"

export const graphqlConfig = {
	uri: appConfig.backendUrl + (appConfig.backendUrl.endsWith("/") ? "" : "/") + "graphql",
}
