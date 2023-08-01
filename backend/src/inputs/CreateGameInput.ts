import { InputType, Field } from "type-graphql";

@InputType()
export class CreateGameInput {
  @Field()
  player1: string;

  @Field()
  player2: string;
}
