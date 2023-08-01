import { Resolver, Query } from "type-graphql";
import { Player } from "../models/Player";

@Resolver()
export class PlayerResolver {
  @Query(() => [Player])
  players() {
    return Player.find();
  }
}
