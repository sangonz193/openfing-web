import { executeCodegen } from "@graphql-codegen/cli"
import * as introspectionPlugin from "@graphql-codegen/introspection"
import type { CodegenPlugin, Types } from "@graphql-codegen/plugin-helpers"
import type { TypeScriptPluginConfig } from "@graphql-codegen/typescript"
import * as typescriptPlugin from "@graphql-codegen/typescript"
import * as typescriptOperationsPlugin from "@graphql-codegen/typescript-operations"
import * as typescriptUrqlPlugin from "@graphql-codegen/typescript-urql"
import type { UrqlRawPluginConfig } from "@graphql-codegen/typescript-urql/config"
import { DocumentMode } from "@graphql-codegen/visitor-plugin-common"
import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import { getIntrospectedSchema, minifyIntrospectionQuery } from "@urql/introspection"
import chalk from "chalk"
import chokidar from "chokidar"
import identity from "lodash/identity"
import path from "path"

import { getFormattedCode } from "../../_utils/getFormattedCode"
import { getMatchingFilePaths } from "../../_utils/getMatchingFilePaths"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"

export type GenerateOperationFilesOptions = {
	remoteSchema: string
	remoteSchemaTypesFilePath: string
	watch: boolean
}

export const generateOperationFiles = async (options: GenerateOperationFilesOptions): Promise<void> => {
	const { watch } = options
	const graphqlFilesPattern = path.resolve(projectPath, "src", "**", "*.urqlGraphql.ts")

	if (
		(await getMatchingFilePaths(graphqlFilesPattern)).some(
			(filePath) => !path.basename(filePath).startsWith("remoteSchema.graphql")
		)
	) {
		await tryRunCodegen(options, graphqlFilesPattern)
	}

	if (watch) {
		const watcher = chokidar.watch(graphqlFilesPattern, { ignoreInitial: true })

		watcher
			.on("add", (filePath) => tryRunCodegen(options, filePath))
			.on("change", (filePath) => tryRunCodegen(options, filePath))
			.on("unlink", async (filePath) => {
				const generatedFilePath = filePath.replace(/\.ts$/, ".generated.ts")

				if (await fsExists(generatedFilePath)) {
					await fs.unlink(generatedFilePath)
				}
			})
	}
}

const tryRunCodegen = (options: GenerateOperationFilesOptions, graphqlFilesPattern: string) =>
	runCodegen(options, graphqlFilesPattern).catch((error) => console.log(chalk.red(error.message)))

const runCodegen = async (options: GenerateOperationFilesOptions, graphqlFilesPattern: string) => {
	const { remoteSchema, remoteSchemaTypesFilePath } = options

	const pluginLoader: Types.PackageLoaderFn<CodegenPlugin> = (name) => {
		if (name.endsWith("typescript")) {
			return typescriptPlugin
		}
		if (name.endsWith("typescriptOperations")) {
			return typescriptOperationsPlugin
		}
		if (name.endsWith("typescriptUrql")) {
			return typescriptUrqlPlugin
		}
		if (name.endsWith("introspection")) {
			return introspectionPlugin
		}

		throw new Error(name + " not found")
	}

	const codegenResult = await executeCodegen({
		schema: remoteSchema,
		pluginLoader: pluginLoader,
		generates: {
			[remoteSchemaTypesFilePath]: {
				plugins: [
					{
						typescript: identity<TypeScriptPluginConfig>({
							enumsAsTypes: true,
							nonOptionalTypename: true,
							scalars: {
								ISODate: "string",
								ISODateTime: "string",
								Void: "undefined",
							},
						}),
					},
				],
			},
			[path.resolve(projectPath, "src")]: {
				preset: "near-operation-file",
				presetConfig: {
					extension: ".generated.ts",
					baseTypesPath: path.relative(path.resolve(projectPath, "src"), remoteSchemaTypesFilePath),
				},
				documents: graphqlFilesPattern,
				plugins: [
					{
						typescriptOperations: {
							preResolveTypes: true,
							avoidOptionals: true,
						},
					},
					{
						typescriptUrql: identity<UrqlRawPluginConfig>({
							documentMode: DocumentMode.external,
							importDocumentNodeExternallyFrom: "near-operation-file",
							pureMagicComment: true,
							nonOptionalTypename: true,
							strictScalars: true,
							withHooks: true,
							scalars: {
								ISODate: "string",
								ISODateTime: "string",
								Void: "undefined",
								Upload: "unknown",
							},
							useTypeImports: true,
							optimizeDocumentNode: true,
						}),
					},
				],
			},
			[path.resolve(projectPath, "src", "graphql", "introspection.json")]: {
				plugins: [
					{
						introspection: identity<introspectionPlugin.IntrospectionPluginConfig>({}),
					},
				],
			},
		},
	})

	await Promise.all(
		codegenResult.map(async (i) => {
			if (i.filename.endsWith(".json")) {
				await fs.writeFile(
					i.filename,
					JSON.stringify(minifyIntrospectionQuery(getIntrospectedSchema(JSON.parse(i.content))), null, 2)
				)
				return
			}

			await fs.writeFile(
				i.filename,
				getFormattedCode(
					getFormattedCode(
						generatedFileHeaderContent +
							(i.content.includes("* as Types") && !i.content.match(/\bTypes\./)
								? i.content.replace(/import \* as Types.+\n(\n)?/, "")
								: i.content)
					).replace(/__typename\?: "\w+?"[,;]?/g, "")
				)
			)
		})
	)
}
