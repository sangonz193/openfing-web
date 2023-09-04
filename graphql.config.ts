import type { IGraphQLConfig } from "graphql-config"

const config: IGraphQLConfig = {
	schema: "./src/gql/schema.graphql",
	documents: ["src/**/*.tsx", "src/**/*.ts", "!src/**/*.urqlGraphql.ts"],
}

export default config
