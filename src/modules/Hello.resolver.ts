import { Context } from "@context/context";
import { isAuthenticated } from "@middlewares/isAuthenticated.middleware";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello(@Ctx() { req }: Context): Promise<string> {
    console.log(req.isAuthenticated());
    return "Hello World!";
  }

  @Query(() => String)
  @UseMiddleware(isAuthenticated)
  async testQuery() {
    return "Authenticated";
  }
}
