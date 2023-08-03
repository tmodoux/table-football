import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Game } from "../models/Game";
import { UpdateGameInput } from "../inputs/UpdateGameInput";
import { Player } from "../models/Player";
import { EndGameInput } from "../inputs/EndGameInput";
import { CreateGameInput } from "../inputs/CreateGameInput";

const CURRENT_GAME_ID = "0";

@Resolver()
export class GameResolver {

  @Query(() => [Game])
  async getCurrentGame() {
    return Game.find({ where: { id: CURRENT_GAME_ID } });
  }

  @Mutation(() => Game)
  async createGame(@Arg("data") data: CreateGameInput) {
    const game = Game.create({
      id: CURRENT_GAME_ID,
      player1: data.player1,
      player2: data.player2,
      goals1: 0,
      goals2: 0,
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
    if (data.id) {
      // End current game
      const currentGame = await Game.findOne({ where: { id: data.id } });
      if (currentGame) {
        await currentGame.remove();
      }
    }
    // Compute scores
    await Promise.all([
      this.updateScore(data.player1, data.goals1, data.goals2),
      this.updateScore(data.player2, data.goals2, data.goals1)
    ]);
    return Player.find();
  }

  async updateScore(id: string, goalsFor: number, goalsAgainst: number) {
    const player = await Player.findOne({ where: { id } });
    if (!player) throw new Error("Player not found!");
    // Wins/losses do not change if tie
    if (goalsFor != goalsAgainst) {
      if (goalsFor > goalsAgainst) {
        player.wins++;
      } else {
        player.losses++
      }
    }
    player.played++;
    player.goalsAgainst += goalsAgainst;
    player.goalsFor += goalsFor;
    await player.save();
  }
}
