import "reflect-metadata";
import * as crudResolvers from "@generated/type-graphql";
import { NonEmptyArray, buildSchema } from "type-graphql";
import { resolve } from "@/utils/node";
import BespokeResolvers from "@/resolvers";

const schema = await buildSchema({
  emitSchemaFile: resolve("schema.graphql"),
  resolvers: [...Object.entries(crudResolvers) as unknown as NonEmptyArray<Function>, ...BespokeResolvers],
});

export default schema;
