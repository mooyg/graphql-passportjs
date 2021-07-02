import { NonEmptyArray } from "type-graphql";

export const pathsToResolvers = [
  __dirname + "/modules/**/*.{js,ts}",
] as NonEmptyArray<string>;
