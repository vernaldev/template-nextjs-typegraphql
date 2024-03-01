import { expressMiddleware } from "@apollo/server/express4";
import { json } from "express";
import { before, after } from "mocha";
import {
  request as graphqlRequest,
  type RequestDocument,
  type Variables,
} from "graphql-request";
import type { VariablesAndRequestHeadersArgs } from "graphql-request/build/esm/types";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { prisma } from "@/context";
import { app, httpServer, server } from "@/server";

before(async () => {
  process.env.TZ = "EST";

  await server.start();
  app.use(json(), expressMiddleware(server));

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4444 }, resolve)
  );
});

after(async () => {
  await server.stop();
  await prisma.$disconnect();
});

export const request = <T, V extends Variables = Variables>(
  document: RequestDocument | TypedDocumentNode<T, V>,
  ...variablesAndRequestHeaders: VariablesAndRequestHeadersArgs<V>
): Promise<T> =>
  graphqlRequest(
    "http://localhost:4444",
    document,
    ...variablesAndRequestHeaders
  );

export type TestArrayElement = {
  query: string;
  queryName: string;
  variables: any;
  error: boolean;
};
