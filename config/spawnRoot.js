const { spawn } = require("promisify-child-process")
const rootPath = require("./rootPath")

/**
 * @param {string} command
 * @param {string[] } [args]
 * @param {import("promisify-child-process").PromisifySpawnOptions} [options]
 */
module.exports = async function spawnRoot(command, args, options) {
	await spawn(command, args ?? [], {
		stdio: "inherit",
		cwd: rootPath,
		...options,
	})
}
