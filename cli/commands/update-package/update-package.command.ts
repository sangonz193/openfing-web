import ncu from "npm-check-updates"
import path from "path/posix"
import type { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "update-package",

	describe: "Updates the `package.json` dependencies to their latest versions.",

	handler: async () => {
		await ncu.run({
			packageFile: path.resolve(projectPath, "package.json"),
			upgrade: true,
			reject: [
				// v > v5 doesn't work in browsers.
				...["query-string", "@types/query-string"],

				// Doesn't work with webpack > v4.
				...["copy-webpack-plugin"],
			],
			loglevel: "info",
		})
	},
}

export default command
