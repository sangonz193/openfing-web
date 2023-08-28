const { generate } = require("@graphql-codegen/cli")
const readEnv = require("../readEnv")
const { z } = require("zod")
const path = require("path")
const rootPath = require("../rootPath")
const { getIntrospectionQuery } = require("graphql")
const { getIntrospectedSchema, minifyIntrospectionQuery } = require("@urql/introspection")
const { fs } = require("@sangonz193/utils/node/fs")

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

		const graphqlEndpoint = VITE_SUPABASE_URL + "/graphql/v1"
		const gqlFolderPath = path.resolve(rootPath, "src/gql")

		await generate({
			schema: graphqlEndpoint,
			generates: {
				[path.resolve(gqlFolderPath, "schema.graphql")]: {
					plugins: ["schema-ast"],
				},
			},
			hooks: { afterOneFileWrite: ["prettier --write"] },
		})

		await fetch(graphqlEndpoint, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				variables: {},
				query: getIntrospectionQuery({ descriptions: false }),
			}),
		})
			.then((result) => result.json())
			.then(async ({ data }) => {
				const minified = minifyIntrospectionQuery(getIntrospectedSchema(data))
				await fs.writeFile(path.resolve(gqlFolderPath, "./schema.json"), JSON.stringify(minified))
			})
	},
}
