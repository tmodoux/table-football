import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Game } from "../models/Game";
import { UpdateGameInput } from "../inputs/UpdateGameInput";
import { Player } from "../models/Player";
import { EndGameInput } from "../inputs/EndGameInput";
import { CreateGameInput } from "../inputs/CreateGameInput";

@Resolver()
export class GameResolver {

  @Query(() => [Game])
  getCurrentGame() {
    return Game.find({ where: { isPlaying: true } });
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
  async updateGame(@Arg("id") id: string, @Arg("data") data: UpdateGameInput) {
    const game = await Game.findOne({ where: { id } });
    if (!game) throw new Error("Game not found!");
    Object.assign(game, data);
    await game.save();
    return game;
  }

  @Mutation(() => [Player])
  async endGame(@Arg("data") data: EndGameInput) {
    let game;
    // Creating and ending an already played game
    if (!data.id) {
      game = Game.create();
      Object.assign(game, data);
    }
    // Ending the current game
    else {
      game = await Game.findOne({ where: { id: data.id } });
      if (!game) throw new Error("Game not found!");
    }
    game.isPlaying = false;
    await game.save();

    // Compute scores
    const player1 = await Player.findOne({ where: { id: game.player1 } });
    const player2 = await Player.findOne({ where: { id: game.player2 } });
    if (!player1 || !player2) throw new Error("Players not found!");
    // Wins/losses do not change if tie
    if (game.goals1 != game.goals2) {
      if (game.goals1 > game.goals2) {
        player1.wins++;
        player2.losses++;
      } else {
        player2.wins++;
        player1.losses++;
      }
    }
    player1.played++;
    player2.played++;
    player1.goalsAgainst += game.goals2;
    player1.goalsFor += game.goals2;
    player2.goalsAgainst += game.goals1;
    player2.goalsFor += game.goals1;
    await player1.save();
    await player2.save();
    return Player.find();
  }

}
