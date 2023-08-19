import { executeCodegen } from "@graphql-codegen/cli"
import type { TypeScriptPluginConfig } from "@graphql-codegen/typescript"
import * as typescriptPlugin from "@graphql-codegen/typescript"
import { fs } from "@sangonz193/utils/node/fs"
import identity from "lodash/identity"
import path from "path"

import { getFormattedCode } from "../../_utils/getFormattedCode"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./generatedFileHeaderContent"

export const generateRemoteSchemaTypes = async (remoteSchema: string): Promise<string> => {
	const remoteSchemaTypesFilePath = path.resolve(projectPath, "src", "graphql", "remoteSchema.types.ts")
	const codegenResult = (
		await executeCodegen({
			schema: remoteSchema,
			pluginLoader: (name) => {
				if (name.endsWith("typescript")) {
					return typescriptPlugin
				}

				throw new Error(name + " not found")
			},
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
			},
		})
	)[0]

	await fs.writeFile(remoteSchemaTypesFilePath, getFormattedCode(generatedFileHeaderContent + codegenResult.content))

	return remoteSchemaTypesFilePath
}
