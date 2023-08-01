import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Player } from "../models/Player";
import { CreatePlayerInput } from "../inputs/CreatePlayerInput";
import { UpdateScoreInput } from "../inputs/UpdateScoreInput";

@Resolver()
export class PlayerResolver {
  @Query(() => [Player])
  players() {
    return Player.find();
  }

  @Mutation(() => Player)
  async createPlayer(@Arg("data") data: CreatePlayerInput) {
    const player = Player.create({
      name: data.name,
      wins: 0,
      losses: 0,
      goalsAgainst: 0,
      goalsFor: 0,
    });
    await player.save();
    return player;
  }

  @Mutation(() => [Player])
  async updateScore(@Arg("data") data: UpdateScoreInput) {
    const winner = await Player.findOne({ where: { id: data.winnerId } });
    if (!winner) throw new Error("Winner not found!");
    winner.goalsFor += data.winnerGoals;
    winner.goalsAgainst += data.looserGoals;
    winner.wins++;
    const looser = await Player.findOne({ where: { id: data.looserId } });
    if (!looser) throw new Error("Looser not found!");
    looser.goalsFor += data.looserGoals;
    looser.goalsAgainst += data.winnerGoals;
    looser.losses++;
    await winner.save();
    await looser.save();
    return Player.find();
  }
}
