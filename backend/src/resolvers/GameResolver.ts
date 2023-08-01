import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Game } from "../models/Game";
import { UpdateGameInput } from "../inputs/UpdateGameInput";
import { CreateGameInput } from "../inputs/CreateGameInput";
import { Player } from "../models/Player";

@Resolver()
export class GameResolver {

  @Query(() => Game)
  getCurrentGame() {
    return Game.findOne({ where: { isPlaying: true } });
  }

  @Mutation(() => Game)
  async createGame(@Arg("data") data: CreateGameInput) {
    const game = Game.create({
      player1: data.player1,
      player2: data.player2,
      goals1: 0,
      goals2: 0,
      isPlaying: true,
    });
    await game.save();
    return game;
  }

  @Mutation(() => Game)
  async updateGame(@Arg("data") data: UpdateGameInput) {
    const game = await Game.findOne({ where: { id: data.id } });
    if (!game) throw new Error("Game not found!");
    game.goals1 = data.goals1;
    game.goals2 = data.goals2;
    await game.save();
    return game;
  }

  @Mutation(() => [Player])
  async endGame(@Arg("id") id: string) {
    const game = await Game.findOne({ where: { id } });
    if (!game) throw new Error("Game not found!");
    game.isPlaying = false;
    await game.save();
    const player1 = await Player.findOne({ where: { id: game.player1 } });
    const player2 = await Player.findOne({ where: { id: game.player2 } });
    if (!player1 || !player2) throw new Error("Players not found!");
    // Wins/losses don't change if tie
    if (game.goals1 != game.goals2) {
      game.goals1 > game.goals2 ? player1.wins++ && player2.losses++ : player2.wins++ && player1.losses++;
    }
    player1.goalsAgainst += game.goals2;
    player1.goalsFor += game.goals2;
    player2.goalsAgainst += game.goals1;
    player2.goalsFor += game.goals1;
    await player1.save();
    await player2.save();
    return Player.find();
  }

}
