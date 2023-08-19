import { fs } from "@sangonz193/utils/node/fs"
import path from "path"
import semver from "semver"

import { projectPath } from "./projectPath"

export async function assertNodeVersion(): Promise<void> {
	const expectedNodeVersion = await fs.readFile(path.resolve(projectPath, ".nvmrc"), "utf-8")

	if (!semver.satisfies(process.version, expectedNodeVersion)) {
		throw new Error(
			`The current node version does not satisfy the expected node version: "${expectedNodeVersion}". Current node version: ${process.version}`
		)
	}
}
