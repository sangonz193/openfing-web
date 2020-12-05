import chalk from "chalk";
import path from "path";
import { CommandModule } from "yargs";

import { fs } from "../../_utils/fs";
import { projectPath } from "../../_utils/projectPath";
import { writeFormattedFile } from "../../_utils/writeFormattedFile";

const command: CommandModule<{}, { name: string }> = {
	command: "create-component <name>" as const,

	describe: "Creates the necessary files to define a new component in the `src/components` folder",

	builder: (yargs) =>
		yargs.positional("name", {
			type: "string",
			describe: "Name of the new component",
			demandOption: true,
		}),

	handler: async (args) => {
		const componentName = args.name.trim();
		const componentsFolderPath = path.resolve(projectPath, "src", "components");
		const newComponentFolderPath = path.resolve(componentsFolderPath, componentName);

		await fs.mkdir(newComponentFolderPath);

		const templateFileContent = async (fileName: string) =>
			(await fs.readFile(path.resolve(__dirname, "templates", fileName), "utf-8")).replace(
				/ComponentName/g,
				componentName
			);

		const filesToCreate: Array<{ path: string; content: () => Promise<string> }> = [
			{
				path: path.resolve(newComponentFolderPath, `${componentName}.base.tsx`),
				content: () => templateFileContent("ComponentName.base.txt"),
			},
			{
				path: path.resolve(newComponentFolderPath, `${componentName}.styles.tsx`),
				content: () => templateFileContent("ComponentName.styles.txt"),
			},
			{
				path: path.resolve(newComponentFolderPath, `${componentName}.tsx`),
				content: () => templateFileContent("ComponentName.txt"),
			},
			{
				path: path.resolve(newComponentFolderPath, `${componentName}.types.tsx`),
				content: () => templateFileContent("ComponentName.types.txt"),
			},
			{
				path: path.resolve(newComponentFolderPath, `index.ts`),
				content: () => templateFileContent("index.txt"),
			},
		];

		await Promise.all(filesToCreate.map(async (f) => writeFormattedFile(f.path, await f.content())));
		console.log(chalk.green(`Component created: ${componentName}`));
	},
};

export default command;
