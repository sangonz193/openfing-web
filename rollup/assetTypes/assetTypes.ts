import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import type { FSWatcher } from "chokidar"
import chokidar from "chokidar"
import type { PluginOption } from "vite"

import { writeSvgTypeFile } from "./writeSvgTypeFile"
import { writeUrlImportTypeFile } from "./writeUrlImportTypeFile"

export function assetTypes() {
	return [
		getOptionsForAssetType({ name: "svg-types", globs: ["src/**/*.svg"], writeTypeFile: writeSvgTypeFile }),
		getOptionsForAssetType({
			name: "url-import-types",
			globs: ["src/**/*.png", "src/**/*.jpg", "src/**/*.jpeg"],
			writeTypeFile: writeUrlImportTypeFile,
		}),
	] satisfies PluginOption[]
}

function getOptionsForAssetType({
	name,
	globs,
	writeTypeFile,
}: {
	name: string
	globs: string[]
	writeTypeFile: (filePath: string) => Promise<void>
}) {
	let watcher: FSWatcher | undefined

	return {
		name: name,
		async buildStart() {
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
		closeWatcher() {
			watcher?.close()
		},
	}
}
