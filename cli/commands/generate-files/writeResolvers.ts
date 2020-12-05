import { codegen } from "@graphql-codegen/core";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { GraphQLSchema, parse, printSchema } from "graphql";
import path from "path";

import { fs } from "../../_utils/fs";
import { projectPath } from "../../_utils/projectPath";

export type WriteResolversOptions = {
	stateSchema: GraphQLSchema;
};

export const writeResolvers = async (options: WriteResolversOptions) => {
	const { stateSchema } = options;
	const generatedFolderPath = path.resolve(projectPath, "src", "generated");
	const resolversPath = path.resolve(generatedFolderPath, "Resolvers.ts");
	const resolversAuxPath = path.resolve(generatedFolderPath, "ResolversAux.ts");

	Promise.all([
		codegen({
			schema: parse(printSchema(stateSchema)),
			documents: [],
			filename: resolversPath,
			// TODO: Why doesn't this work?
			// preset: "import-types",
			// presetConfig: {
			// 	typesPath: path.relative(resolversPath, typesFilePath),
			// },
			plugins: [
				{
					typescript: {
						enumsAsTypes: true,
					},
				},
				{
					typescriptResolvers: {
						enumsAsTypes: true,
						contextType: "./ResolversAux" + "#Context",
						customResolveInfo: "./ResolversAux" + "#ResolveInfo",
						noSchemaStitching: true,
						avoidOptionals: true,
					},
				},
			],
			pluginMap: {
				typescript: typescriptPlugin,
				typescriptResolvers: typescriptResolversPlugin,
			},
			config: {},
		}).then((content) => fs.writeFile(resolversPath, content)),

		fs.writeFile(
			resolversAuxPath,
			`import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
    import { FragmentMap } from "apollo-utilities";
    import type { FieldNode } from "graphql";
    
    import { Resolvers } from "./Resolvers";
    
    export type Context = {
        client: ApolloClient<NormalizedCacheObject>;
        cache: InMemoryCache;
    };
    
    export type ResolveInfo =
        | {
                field: FieldNode;
                fragmentMap: FragmentMap;
          }
        | undefined;
    
    export type PartialResolvers<
        TResolversKey extends keyof Resolvers,
        TEntityResolversKeys extends keyof Resolvers[TResolversKey]
    > = {
        [K in TResolversKey]: Pick<Resolvers[TResolversKey], TEntityResolversKeys>;
    };`
		),
	]);
};
