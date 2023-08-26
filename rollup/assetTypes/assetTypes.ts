import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import type { FSWatcher } from "chokidar"
import chokidar from "chokidar"
import { glob } from "glob"
import type { PluginOption } from "vite"

import { writeSvgTypeFile } from "./writeSvgTypeFile"
import { writeUrlImportTypeFile } from "./writeUrlImportTypeFile"

export function assetTypes(command: "serve" | "build") {
	return [
		getOptionsForAssetType({
			name: "svg-types",
			globs: ["src/**/*.svg"],
			writeTypeFile: writeSvgTypeFile,
			command,
		}),
		getOptionsForAssetType({
			name: "url-import-types",
			globs: ["src/**/*.png", "src/**/*.jpg", "src/**/*.jpeg"],
			writeTypeFile: writeUrlImportTypeFile,
			command,
		}),
	] satisfies PluginOption[]
}

function getOptionsForAssetType({
	name,
	globs,
	writeTypeFile,
	command,
}: {
	name: string
	globs: string[]
	writeTypeFile: (filePath: string) => Promise<void>
	command: "serve" | "build"
}) {
	let watcher: FSWatcher | undefined

	return {
		name: name,
		async buildStart() {
			if (command === "build") {
				await writeFilesForAssetType({ globs, writeTypeFile })
				return
			}

			watcher = chokidar.watch(globs, {})

			watcher
				.on("add", async (filePath) => {
					await writeTypeFile(filePath)
				})
				.on("unlink", async (filePath) => {
					const assetTypesFilePath = filePath + ".d.ts"

					if (await fsExists(assetTypesFilePath)) {
						fs.unlink(assetTypesFilePath)
					}
				})
		},
		buildEnd() {
			watcher?.close()
		},
	} as PluginOption
}

async function writeFilesForAssetType({
	globs,
	writeTypeFile,
}: {
	globs: string[]
	writeTypeFile: (filePath: string) => Promise<void>
}) {
	const filePaths = globs.map((g) => glob.sync(g, { ignore: ["**/node_modules/**"] })).flat()

	await Promise.all(filePaths.map((filePath) => writeTypeFile(filePath)))
}
