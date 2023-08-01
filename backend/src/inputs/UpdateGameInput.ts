import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateGameInput {
  @Field()
  id: string;

  @Field()
  goals1: number;

  @Field()
  goals2: number;
}
