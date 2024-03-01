import "reflect-metadata";
import { json } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { app, httpServer, server } from "@/server";
import { CORS_ALLOW_ORIGINS, PORT } from "@/constants";

await server.start();

app.use(
  cors({
    origin: CORS_ALLOW_ORIGINS,
    credentials: true,
  }),
  json(),
  expressMiddleware(server)
);

await new Promise<void>((resolve) => {
  httpServer.listen({ port: PORT }, resolve);
});
console.log(`🚀 Server ready at http://localhost:${PORT}`);
