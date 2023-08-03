import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "../src/data-source";
import { PlayerResolver } from "../src/resolvers/PlayerResolver";
import { GameResolver } from "../src/resolvers/GameResolver";
import { DataSource } from "typeorm";

export const initTestEnv = async (): Promise<[DataSource, ApolloServer]> => {
    AppDataSource.setOptions({ database: ":memory:" });
    const testDataSource = await AppDataSource.initialize();
    const schema = await buildSchema({
        resolvers: [PlayerResolver, GameResolver],
        validate: { forbidUnknownValues: false },
    });
    const testServer = new ApolloServer({ schema });
    return [testDataSource, testServer];
};