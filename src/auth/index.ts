import { Router } from "express";
import { discordOauth } from "./Strategy/discord";
import { PassportStatic } from "passport";
import { PrismaClient } from "@prisma/client";

export const initializeAuthRoutes = (
  passport: PassportStatic,
  prisma: PrismaClient
): Router => {
  const authRouter = Router();

  authRouter.use("/discord", discordOauth(passport, prisma));

  return authRouter;
};
