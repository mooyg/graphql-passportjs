import * as Express from "express";
import "reflect-metadata";
import * as cors from "cors";
import * as connectRedis from "connect-redis";
import * as session from "express-session";
import { redis } from "@redis/redis";
import { createApolloServer } from "@util/createApolloServer";
import { corsOptions } from "@cors/corsOption";
import { initializeAuthRoutes } from "./auth";
import * as passport from "passport";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const main = async () => {
  const app = Express();

  const apolloServer = await createApolloServer(db);
  const RedisStore = connectRedis(session);

  app.use(cors(corsOptions));

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: "somename",
      secret: "somesecret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );
  app.use(passport.initialize());

  app.use(passport.session());
  passport.serializeUser((user, done) => done(null, user));
  // @ts-ignore
  passport.deserializeUser((user, done) => done(null, user));

  app.use("/api/auth", initializeAuthRoutes(passport, db));

  app.get("/", (req, res) => {
    console.log(req.user);
    res.send("didn't worked");
  });
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Server launched on http://localhost:4000/graphql 🚀 ");
  });
};
main();
