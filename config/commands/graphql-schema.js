const { generate } = require("@graphql-codegen/cli")
const readEnv = require("../readEnv")
const { z } = require("zod")
const path = require("path")
const rootPath = require("../rootPath")

/** @type {import("yargs").CommandModule} */
module.exports = {
	command: "graphql-schema",
	describe: "Generate the Supabase GraphQL schema from the remote URL.",
	async handler() {
		await readEnv()

		const { VITE_SUPABASE_URL } = z
			.object({
				VITE_SUPABASE_URL: z.string().url(),
			})
			.parse(process.env)

		await generate({
			schema: VITE_SUPABASE_URL + "/graphql/v1",
			generates: {
				[path.resolve(rootPath, "src/gql/schema.graphql")]: {
					plugins: ["schema-ast"],
				},
			},
			hooks: { afterOneFileWrite: ["prettier --write"] },
		})
	},
}
