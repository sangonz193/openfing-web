const spawnRoot = require("../spawnRoot")

/** @type {import("yargs").CommandModule} */
module.exports = {
	command: "dev",
	describe: "Start the development server.",
	handler: () => spawnRoot("npm", ["run", "dev"]),
}
