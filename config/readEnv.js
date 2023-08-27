const chalk = require("chalk").default
const dotenv = require("dotenv")
const path = require("path")
const rootPath = require("./rootPath")
const { fsExists } = require("@sangonz193/utils/node/fsExists")

module.exports = async function readEnv() {
	const envPath = path.resolve(rootPath, ".env")

	if (!(await fsExists(envPath))) {
		chalk.yellow(`No .env file found at ${envPath}.`)
		return
	}

	dotenv.config({ path: path.resolve(rootPath, ".env") })
}
