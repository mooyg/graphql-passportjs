import { ApolloServer } from "apollo-server-express";
import { createSchema } from "@util/createSchema";
import { PrismaClient } from "@prisma/client";

export const createApolloServer = async (
  db: PrismaClient
): Promise<ApolloServer> => {
  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req }) => {
      return {
        req,
        prisma: db,
      };
    },
  });
  return apolloServer;
};
