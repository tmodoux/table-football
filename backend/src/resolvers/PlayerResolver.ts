import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Player } from "../models/Player";
import { CreatePlayerInput } from "../inputs/CreatePlayerInput";

@Resolver()
export class PlayerResolver {
  @Query(() => [Player])
  getPlayers() {
    return Player.find();
  }

  @Mutation(() => Player)
  async createPlayer(@Arg("data") data: CreatePlayerInput) {
    const player = Player.create({
      name: data.name,
      played: 0,
      wins: 0,
      losses: 0,
      goalsAgainst: 0,
      goalsFor: 0,
    });
    await player.save();
    return player;
  }
}
