import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { PlayerResolver } from "./resolvers/PlayerResolver";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";

async function main() {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [PlayerResolver],
    validate: { forbidUnknownValues: false },
  });
  const server = new ApolloServer({ schema });
  await server.listen(4000);
  console.log("Server has started!");
}
main();
