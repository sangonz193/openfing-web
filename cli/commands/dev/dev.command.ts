import { spawn } from "promisify-child-process"
import type { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "dev",

	describe: "Runs the app in development mode and runs generate-files on watch mode.",

	handler: async () => {
		const createGenerateFilesSpawn = () => spawn("node", ["cli", "generate-files", "-w"])
		let generateFilesSpawn = createGenerateFilesSpawn()

		const onGenerateFilesSpawnError = (error: any) => {
			console.error(error)
			generateFilesSpawn.kill()
			generateFilesSpawn = createGenerateFilesSpawn()
			generateFilesSpawn.catch(onGenerateFilesSpawnError)
		}

		generateFilesSpawn.catch(onGenerateFilesSpawnError)

		await spawn("npx", ["react-scripts", "start"], {
			stdio: "inherit",
			cwd: projectPath,
		})
	},
}

export default command
