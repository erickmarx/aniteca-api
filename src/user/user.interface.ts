import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserGQL implements User {
  @Field(() => ID)
  id: number;
}
