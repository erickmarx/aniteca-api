import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@ObjectType()
@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @Column()
  text: string;

  @Column()
  anime: number;

  @Column()
  episode: number;
}