import { arrayMapLimit } from "@sangonz193/utils/arrayMapLimit"
import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import { identityMap } from "@sangonz193/utils/identityMap"
import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import chokidar from "chokidar"
import identity from "lodash/identity"
import path from "path"

import { getFormattedCode } from "../../_utils/getFormattedCode"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"

type AssetExtension = "svg" | "png" | "jpeg" | "jpg" | "ttf" | "md" | "mdx" | "css"

export async function generateAssetsTypes(watch: boolean) {
	const srcPath = path.resolve(projectPath, "src")
	const extensionsMap = identityMap<AssetExtension>({
		jpeg: 0,
		jpg: 0,
		png: 0,
		svg: 0,
		ttf: 0,
		md: 0,
		mdx: 0,
		css: 0,
	})
	const assetExtensions = dangerousKeysOf(extensionsMap)
	const pathPatterns = assetExtensions.map((ext) => path.resolve(srcPath, "**", "*." + ext))

	const extensionFilePathList = (
		await arrayMapLimit(
			pathPatterns,
			async (pathPattern, index) => {
				const assetExtension = assetExtensions[index]
				return (await getMatchingFilePaths(pathPattern)).map((filePath) => [assetExtension, filePath] as const)
			},
			5
		)
	).flat()

	await arrayMapLimit(
		extensionFilePathList,
		async (extensionFilePath) => {
			return generateAssetTypes(extensionFilePath[1], extensionFilePath[0])
		},
		10
	)

	function extensionIsAssetExtension(value: string): value is AssetExtension {
		return Object.keys(extensionsMap).includes(value)
	}

	if (watch) {
		const watcher = chokidar.watch(pathPatterns, { ignoreInitial: true })

		watcher
			.on("add", (filePath) => {
				const extension = path.extname(filePath)

				if (extensionIsAssetExtension(extension)) {
					generateAssetTypes(filePath, extension)
				}
			})
			.on("change", (filePath) => {
				const extension = path.extname(filePath)

				if (extensionIsAssetExtension(extension)) {
					generateAssetTypes(filePath, extension)
				}
			})
			.on("unlink", async (filePath) => {
				const assetTypesFilePath = getAssetTypesFilePath(filePath)

				if (await fsExists(assetTypesFilePath)) {
					fs.unlink(assetTypesFilePath)
				}
			})
	}
}

function getAssetTypesFilePath(filePath: string) {
	return filePath + ".d.ts"
}

async function generateAssetTypes(filePath: string, extension: AssetExtension) {
	await fs.writeFile(getAssetTypesFilePath(filePath), getGeneratedFileContent(extension))
}

function getGeneratedFileContent(extension: AssetExtension) {
	if (identity<Array<typeof extension>>(["md", "mdx"]).includes(extension)) {
		return getFormattedCode(
			generatedFileHeaderContent +
				[
					`import React from "React"`,
					``,
					`declare const Component: React.FC<{}>`,
					`export default Component`,
				].join(`\n`)
		)
	}

	if (extension === "svg") {
		return getFormattedCode(
			[
				generatedFileHeaderContent,
				`import React from "React"`,
				``,
				`export declare const ReactComponent: React.FC<React.SVGAttributes<SVGElement>>`,
				``,
				`declare const filePath: string;`,
				`export default filePath;`,
			].join("\n")
		)
	}

	if (extension === "css") {
		return getFormattedCode(generatedFileHeaderContent + `export default undefined`)
	}

	return getFormattedCode(
		generatedFileHeaderContent + `declare const filePath: string;\n` + `export default filePath;\n`
	)
}
