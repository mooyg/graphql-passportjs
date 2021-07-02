import { Context } from "@context/context";
import { MiddlewareFn } from "type-graphql";

export const isAuthenticated: MiddlewareFn<Context> = async (
  { context: { req } },
  next
) => {
  if (!req.isAuthenticated()) throw new Error("Not Authenticated.");
  return next();
};
