import { GraphQLSchema } from "graphql";
import { pathsToResolvers } from "src/pathToResolvers";
import { buildSchema } from "type-graphql";

export const createSchema = async (): Promise<GraphQLSchema> => {
  return await buildSchema({
    resolvers: pathsToResolvers,
  });
};
