import path from "path"
import type { CommandModule } from "yargs"

import { getSubCommandsSync } from "../../_utils/getSubCommands"

const command: CommandModule<{}, {}> = {
	command: "create",

	builder: (yargs) => {
		const commandsFolderPath = path.resolve(__dirname, "commands")
		getSubCommandsSync(commandsFolderPath).forEach((command) => yargs.command(command))

		return yargs
	},

	handler: () => {
		// Do nothing
	},
}

export default command
