const path = require("path")
const rootPath = require("../rootPath")

// TODO: Fix Storybook setup
/** @type {import("yargs").CommandModule} */
module.exports = {
	command: "dev:storybook",
	describe: "Runs the storybook interface.",
	handler: () => {
		const storybookBinFolderPath = path.resolve(rootPath, "node_modules", "@storybook", "react", "bin")
		require(storybookBinFolderPath)
	},
}
