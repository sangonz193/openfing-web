import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
	schema: ["src/gql/schema.graphql"],
	documents: ["src/**/*.tsx", "src/**/*.ts", "!src/**/*.urqlGraphql.ts"],
	generates: {
		"./src/gql/": {
			preset: "client",
			presetConfig: {
				fragmentMasking: false,
			},
		},
	},
	hooks: { afterOneFileWrite: ["prettier --write"] },
}

export default config
