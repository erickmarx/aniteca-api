import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Animes {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;
}
