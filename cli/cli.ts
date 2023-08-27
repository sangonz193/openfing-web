import path from "path"
import type { CommandModule } from "yargs"
import yargs from "yargs"

import { getSubCommands } from "./_utils/getSubCommands"

const run = async () => {
	const commandsDirPath = path.resolve(__dirname, "commands")
	const commands: Array<CommandModule<unknown, unknown>> = await getSubCommands(commandsDirPath)

	const _yargs = yargs.scriptName("node cli")

	commands.forEach((command) => _yargs.command(command))

	_yargs.locale("en_US").parserConfiguration({ "camel-case-expansion": false }).showHelpOnFail(false).strict().argv
}

run()
