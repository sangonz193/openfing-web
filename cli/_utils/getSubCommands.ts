import path from "path"
import type { CommandModule } from "yargs"

import { getMatchingFilePaths } from "./getMatchingFilePaths"

export const getSubCommands = async (directoryPath: string): Promise<Array<CommandModule<unknown, unknown>>> => {
	const matchingFiles = await Promise.all([
		getMatchingFilePaths(path.resolve(directoryPath, "*.command.ts")),
		getMatchingFilePaths(path.resolve(directoryPath, "*/*.command.ts")),
	]).then((results) => results.reduce((result, matchingPaths) => [...result, ...matchingPaths]))

	return matchingFiles.map((filePath) => {
		return require(filePath).default
	})
}
