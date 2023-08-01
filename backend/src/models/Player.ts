import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Player extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Number)
  @Column()
  played: number;

  @Field(() => Number)
  @Column()
  wins: number;

  @Field(() => Number)
  @Column()
  losses: number;

  @Field(() => Number)
  @Column()
  goalsFor: number;

  @Field(() => Number)
  @Column()
  goalsAgainst: number;
}
