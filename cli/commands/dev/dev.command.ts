import { spawn } from "promisify-child-process"
import type { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "dev",

	describe: "Runs the app in development mode and runs generate-files on watch mode.",

	handler: async () => {
		await spawn("node", ["cli", "generate-files"])

		await spawn("npx", ["react-scripts", "start"], {
			stdio: "inherit",
			cwd: projectPath,
		})
	},
}

export default command
