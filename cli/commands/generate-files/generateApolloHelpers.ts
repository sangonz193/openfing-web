import { executeCodegen } from "@graphql-codegen/cli"
import * as typescriptApolloClientHelpersPlugin from "@graphql-codegen/typescript-apollo-client-helpers"
import { ApolloClientHelpersConfig } from "@graphql-codegen/typescript-apollo-client-helpers/config"
import { identity } from "lodash"
import path from "path"

import { fs } from "../../_utils/fs"
import { getFormattedCode } from "../../_utils/getFormattedCode"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"

export type GenerateApolloHelpersOptions = {
	remoteSchema: string
	watch: boolean
}

export async function generateApolloHelpers(options: GenerateApolloHelpersOptions) {
	const { remoteSchema } = options
	const apolloHelpersFilePath = path.resolve(projectPath, "src", "graphql", "apolloHelpers.generated.ts")

	const codegenResult = await executeCodegen({
		schema: remoteSchema,
		pluginLoader: (name) => {
			if (name.endsWith("typescriptApolloClient")) {
				return typescriptApolloClientHelpersPlugin
			}

			throw new Error(name + " not found")
		},
		generates: {
			[apolloHelpersFilePath]: {
				plugins: [
					{
						typescriptApolloClient: identity<ApolloClientHelpersConfig>({
							useTypeImports: true,
							requireKeyFields: true,
							requirePoliciesForAllTypes: true,
						}),
					},
				],
			},
		},
	})

	await Promise.all(
		codegenResult.map(async (i) => {
			await fs.writeFile(
				i.filename,
				getFormattedCode(
					generatedFileHeaderContent +
						(i.content.includes("* as Types") && !i.content.match(/\bTypes\./)
							? i.content.replace(/import \* as Types.+\n(\n)?/, "")
							: i.content)
				)
			)
		})
	)
}
