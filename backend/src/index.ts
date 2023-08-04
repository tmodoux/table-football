import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { PlayerResolver } from "./resolvers/PlayerResolver";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { GameResolver } from "./resolvers/GameResolver";
require("dotenv").config();

const PORT = process.env.PORT || 4000;

async function main() {
  await AppDataSource.initialize();
  const schema = await buildSchema({
    resolvers: [PlayerResolver, GameResolver],
    validate: { forbidUnknownValues: false },
  });
  const server = new ApolloServer({ schema });
  await server.listen(PORT);
  console.log(`Server listening on port ${PORT}.`);
}
main();
