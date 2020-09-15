import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
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
    };