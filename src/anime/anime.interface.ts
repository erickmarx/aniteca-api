import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Anime, CommentTable } from '@prisma/client';

@ObjectType()
export class getAllAnimes {
  @Field(() => ID)
  mal_id: number;
  image_url: string;
  title: string;
  score: number;
}

@ObjectType()
export class CommentGQL implements CommentTable {
  @Field(() => ID)
  id: number;
  userId: number;
  text: string;
  animeId: number;
  episodeId: number;
}

@ObjectType()
export class AnimeGQL implements Anime {
  @Field(() => ID)
  id: number;
  imageUrl: string;
  title: string;
  score: number;
  season: number;
}
