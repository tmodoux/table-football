import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateScoreInput {
  @Field()
  winnerId: string;

  @Field()
  winnerGoals: number;

  @Field()
  looserId: string;

  @Field()
  looserGoals: number;
}
