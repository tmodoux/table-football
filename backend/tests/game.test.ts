import { ApolloServer } from "apollo-server";
import { DataSource } from "typeorm";
import { CREATE_GAME, CREATE_PLAYER, END_GAME, GET_CURRENT_GAME, UPDATE_GAME } from "./testQueries";
import { initTestEnv } from "./testUtils";
import { Player } from "../src/models/Player";

describe('Game', () => {
    let testDataSource: DataSource;
    let testServer: ApolloServer;

    beforeAll(async () => {
        [testDataSource, testServer] = await initTestEnv();
    });

    afterAll(async () => {
        await testDataSource.destroy();
    });

    afterEach(async () => {
        await testDataSource.synchronize(true);
    });

    test('should return empty games array', async () => {
        const get = await testServer.executeOperation({ query: GET_CURRENT_GAME });
        expect(get.errors).toBeUndefined;
        expect(get.data?.getCurrentGame).toHaveLength(0);
    });

    test('should return created game', async () => {
        const expectedGame = {
            id: '0',
            player1: "jean",
            player2: "jeanne",
            goals1: 0,
            goals2: 0,
        };

        const create = await testServer.executeOperation({
            query: CREATE_GAME,
            variables: { data: { player1: expectedGame.player1, player2: expectedGame.player2 } }
        });
        expect(create.errors).toBeUndefined;
        expect(create.data?.createGame).toEqual(expectedGame);

        const get = await testServer.executeOperation({ query: GET_CURRENT_GAME });
        expect(get.errors).toBeUndefined;
        expect(get.data?.getCurrentGame[0]).toEqual(expectedGame);
    });

    test('should return updated game', async () => {
        const create = await testServer.executeOperation({
            query: CREATE_GAME,
            variables: { data: { player1: "jean", player2: "jeanne" } }
        });

        const expectedGame = create.data?.createGame;
        expectedGame.goals1 = 42;
        const { id, ...updatedGame } = expectedGame;

        const update = await testServer.executeOperation({
            query: UPDATE_GAME,
            variables: { id, data: updatedGame }
        });

        expect(update.errors).toBeUndefined;
        expect(update.data?.updateGame).toEqual(expectedGame);
    });

    describe('Endgame', () => {
        let players: Player[];

        beforeEach(async () => {
            const create = await Promise.all(["jean", "jeanne"].map(player =>
                testServer.executeOperation({
                    query: CREATE_PLAYER,
                    variables: { data: { name: player } }
                })
            ));
            players = create.map((player) => player.data?.createPlayer)
        });

        test('should end game and compute scores', async () => {
            const create = await testServer.executeOperation({
                query: CREATE_GAME,
                variables: { data: { player1: players[0].id, player2: players[1].id } }
            });
            const gameId = create.data?.createGame.id;
            expect(gameId).toBeDefined;

            const end = await testServer.executeOperation({
                query: END_GAME,
                variables: { data: { id: gameId, player1: players[0].id, player2: players[1].id, goals1: 2, goals2: 3 } }
            });
            expect(end.errors).toBeUndefined;
            const scores: Player[] = end.data?.endGame;
            expect(scores).toHaveLength(2);
            for (const score of scores) {
                if (score.id === players[0].id) {
                    expect(score).toMatchObject({
                        played: 1,
                        wins: 0,
                        losses: 1,
                        goalsFor: 2,
                        goalsAgainst: 3,
                    });
                } else {
                    expect(scores[0]).toMatchObject({
                        played: 1,
                        wins: 1,
                        losses: 0,
                        goalsFor: 3,
                        goalsAgainst: 2,
                    });
                }
            }
        });

        test('should handle tie', async () => {
            const end = await testServer.executeOperation({
                query: END_GAME,
                variables: { data: { id: "", player1: players[0].id, player2: players[1].id, goals1: 2, goals2: 2 } }
            });
            expect(end.errors).toBeUndefined;
            const scores: Player[] = end.data?.endGame;
            expect(scores).toHaveLength(2);
            for (const score of scores) {
                if (score.id === players[0].id) {
                    expect(score).toMatchObject({
                        played: 1,
                        wins: 0,
                        losses: 0,
                        goalsFor: 2,
                        goalsAgainst: 2,
                    });
                } else {
                    expect(scores[0]).toMatchObject({
                        played: 1,
                        wins: 0,
                        losses: 0,
                        goalsFor: 2,
                        goalsAgainst: 2,
                    });
                }
            }
        });
    });
})