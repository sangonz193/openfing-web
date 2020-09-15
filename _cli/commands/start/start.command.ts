import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { CommandModule } from "yargs";

import { webpackConfigFactory } from "../../_utils/webpack";

const command: CommandModule<{}, {}> = {
	command: "start" as const,

	describe: "Starts the app in watch mode",

	builder: (yargs) => yargs,

	handler: async () => {
		const webpackConfig = webpackConfigFactory("development");
		const compiler = webpack(webpackConfig);

		const devServerOptions = Object.assign({}, webpackConfig.devServer, {
			stats: {
				colors: true,
			},
		});
		const server = new WebpackDevServer(compiler, devServerOptions);

		const port = 3000;

		server.listen(port, "0.0.0.0", () => {
			console.log(`Starting server on http://localhost:${port}`);
		});
	},
};

export default command;
