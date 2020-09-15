import { CodeFileLoader } from "@graphql-toolkit/code-file-loader";
import { loadSchema } from "@graphql-toolkit/core";
import { GraphQLSchema } from "graphql";
import path from "path";

import { projectPath } from "../../_utils/projectPath";

export type GetStateSchemaOptions = {
	remoteSchema: GraphQLSchema;
};

export const getStateSchema = async (options: GetStateSchemaOptions): Promise<GraphQLSchema> => {
	const { remoteSchema } = options;
	const stateSchemaGlobPath = path.resolve(projectPath, "src", "graphql", "local", "**", "*.graphql.ts");

	return loadSchema(stateSchemaGlobPath, {
		loaders: [new CodeFileLoader()],
		schemas: [remoteSchema],
	});
};
