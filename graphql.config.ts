import type { IGraphQLConfig } from "graphql-config"

const config: IGraphQLConfig = {
	schema: "./src/graphql/remote.graphql",
	documents: "./src/**/*.tsx",
}

export default config
