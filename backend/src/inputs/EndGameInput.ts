import { InputType, Field } from "type-graphql";

@InputType()
export class EndGameInput {
  @Field()
  id?: string;

  @Field()
  player1: string;

  @Field()
  player2: string;

  @Field()
  goals1: number;

  @Field()
  goals2: number;
}
