import webpack from "webpack";
import { CommandModule } from "yargs";

import { webpackConfigFactory } from "../../_utils/webpack";

const command: CommandModule<{}, {}> = {
	command: "build" as const,

	describe: "Bundles the app to be deployed",

	builder: (yargs) => yargs,

	handler: async () => {
		const handler: webpack.Compiler.Handler = (err, stats) => {
			if (err) console.error(err);
			if (stats) console.log(stats.toString({ colors: true }));
		};

		webpack(webpackConfigFactory("production"), handler);
	},
};

export default command;
