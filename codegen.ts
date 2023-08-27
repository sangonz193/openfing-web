import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
	schema: ["src/gql/schema.graphql"],
	documents: ["src/**/*.tsx"],
	generates: {
		"./src/gql/": {
			preset: "client",
		},
	},
}

export default config
