const { scriptName } = require("yargs")

scriptName("node cli").commandDir("config/commands").demandCommand().help().argv
