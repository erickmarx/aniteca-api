import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';

@ObjectType()
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @OneToMany(
    () => CommentEntity,
    (comment) => {
      comment.user;
    },
  )
  comments: CommentEntity[];
}
