import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePlayerInput {
  @Field()
  name: string;
}
