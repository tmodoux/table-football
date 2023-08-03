import { ApolloServer } from "apollo-server";
import { CREATE_PLAYER, GET_PLAYERS } from "./testQueries";
import { DataSource } from "typeorm";
import { initTestEnv } from "./testUtils";

describe('Player', () => {
    let testDataSource: DataSource;
    let testServer: ApolloServer;

    beforeAll(async () => {
        [testDataSource, testServer] = await initTestEnv();
    });

    afterAll(async () => {
        await testDataSource.destroy();
    });

    test('should return empty players array', async () => {
        const get = await testServer.executeOperation({ query: GET_PLAYERS });
        expect(get.errors).toBeUndefined;
        expect(get.data?.getPlayers).toHaveLength(0);
    });

    test('should return created player', async () => {
        const expectedPlayer = {
            id: '1',
            name: 'jean',
            played: 0,
            wins: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0
        };

        const create = await testServer.executeOperation({
            query: CREATE_PLAYER,
            variables: { data: { name: expectedPlayer.name } }
        });
        expect(create.errors).toBeUndefined;
        expect(create.data?.createPlayer).toEqual(expectedPlayer);

        const get = await testServer.executeOperation({ query: GET_PLAYERS });
        expect(get.errors).toBeUndefined;
        expect(get.data?.getPlayers[0]).toEqual(expectedPlayer);
    });
})