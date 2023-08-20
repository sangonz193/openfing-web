import { arrayMapLimit } from "@sangonz193/utils/arrayMapLimit"
import { fs } from "@sangonz193/utils/node/fs"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import chokidar from "chokidar"
import path from "path"

import { getFormattedCode } from "../../_utils/getFormattedCode"
import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./generatedFileHeaderContent"
import { getImportPath } from "./getImportPath"

export const generateSvgIconFiles = async (watch: boolean) => {
	const glob = path.resolve(projectPath, "src", "components", "Icon", "*.svg")

	if (watch) {
		const watcher = chokidar.watch(glob, { ignoreInitial: true })

		watcher
			.on("add", (filePath) => {
				writeIconFiles(filePath)
			})
			.on("change", (filePath) => {
				writeIconFiles(filePath)
			})
			.on("unlink", async (filePath) => {
				fs.unlink(getGeneratedIconFileBasename(path.basename(filePath))).catch(() => null)
			})
	}

	await writeFilesForGlob(glob)
}

async function writeFilesForGlob(glob: string) {
	await arrayMapLimit(
		await getMatchingFilePaths(glob),
		async (matchingFilePath) => {
			await writeIconFiles(matchingFilePath)
		},
		20
	)
}

async function writeIconFiles(svgFilePath: string) {
	const iconName = getIconName(svgFilePath)
	const constantStyleName = iconName.replace(/([a-z])([A-Z])/g, (match) => match[0] + "_" + match[1]).toUpperCase()
	const generatedFilePath = path.resolve(svgFilePath, "..", getGeneratedIconFileBasename(svgFilePath))
	const generatedFileContent =
		generatedFileHeaderContent +
		[
			`import { registerIcons } from "@fluentui/style-utilities"`,
			``,
			`import { ReactComponent } from "${getImportPath(generatedFilePath, svgFilePath)}"`,
			``,
			`export const ${constantStyleName}_ICON_NAME = "${iconName}"`,
			``,
			`registerIcons({`,
			`icons: {`,
			`[${constantStyleName}_ICON_NAME]: <ReactComponent />,`,
			`}`,
			`})`,
		].join("\n")

	await fs.writeFile(generatedFilePath, await getFormattedCode(generatedFileContent))
}

function getIconName(filePath: string) {
	const match = path.basename(filePath).match(/([\w-]*?)\./)
	if (!match) {
		return "Default"
	}

	return match[1].replace(/-(\w)/g, (_, char: string) => char.toUpperCase()).replace(/^./, (v) => v.toUpperCase())
}

function getGeneratedIconFileBasename(iconFileBasename: string): string {
	return iconFileBasename.replace(/\.svg$/, "") + ".generated.tsx"
}
