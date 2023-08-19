import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import chalk from "chalk"
import dotenv from "dotenv"
import path from "path"

import { projectPath } from "./projectPath"

export async function applyEnvVariables() {
	const envFilePath = path.resolve(projectPath, ".env")

	if (await fsExists(envFilePath)) {
		const envFileValues = dotenv.parse(await fs.readFile(envFilePath, "utf8"))
		Object.keys(envFileValues).forEach((envFileKey) => {
			process.env[envFileKey] = process.env[envFileKey] ?? envFileValues[envFileKey]
		})
	} else {
		console.log(chalk.yellow(`Env file not found: .env\nSkipping env config.`))
	}
}
