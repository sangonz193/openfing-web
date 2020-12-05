import { buildSchema, printSchema } from "graphql";
import { CommandModule } from "yargs";

import { _fs, fs } from "../../_utils/fs";
import { generateFilesConfig } from "./_utils/generateFilesConfig";
import { getRemoteSchema } from "./getRemoteSchema";
import { getStateSchema } from "./getStateSchema";
import { typeAssets } from "./typeAssets";
import { writeOperationFiles } from "./writeOperationFiles";
import { writePossibleTypes } from "./writePossibleTypes";
import { writeResolvers } from "./writeResolvers";

const command: CommandModule<{}, {}> = {
	command: "generate-files" as const,

	describe: "Generates helper files, such as `.d.ts` files for every asset and graphql/typescript related files.",

	builder: (yargs) => yargs,

	handler: async () => {
		const { generatedFolderPath } = generateFilesConfig;

		if (!_fs.existsSync(generatedFolderPath)) await fs.mkdir(generatedFolderPath);

		const { remoteSchema, fetchedFromRemote } = await getRemoteSchema();

		const stateSchema = getStateSchema({
			remoteSchema: buildSchema(remoteSchema),
		});

		await Promise.all([
			fetchedFromRemote ? writePossibleTypes() : Promise.resolve(undefined),
			typeAssets(),
		] as const);

		await Promise.all([
			writeResolvers({
				stateSchema: await stateSchema,
			}),
			writeOperationFiles({
				stateSchema: printSchema(await stateSchema),
			}),
		]);
	},
};

export default command;
