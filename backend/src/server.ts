import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { applyMiddleware } from "graphql-middleware";
import depthLimit from "graphql-depth-limit";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import schema from "@/schema";

export const app = express();
export const httpServer = http.createServer(app);
export const server = new ApolloServer({
  schema: applyMiddleware(schema),
  introspection: true,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
  csrfPrevention: true,
  validationRules: [depthLimit(10)],
});
