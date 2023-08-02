import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  player1: string;

  @Field(() => String)
  @Column()
  player2: string;

  @Field(() => Number)
  @Column()
  goals1: number;

  @Field(() => Number)
  @Column()
  goals2: number;
}
