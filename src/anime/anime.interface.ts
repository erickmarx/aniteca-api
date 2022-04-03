import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Anime, CommentTable, Episode } from '@prisma/client';

@ObjectType()
export class getAllAnimes {
  mal_id: number;
  images: { webp: { image_url: string } };
  title: string;
  score: number;
  synopsis?: string;
  duration?: string;
  aired: { string: string };
}

@ObjectType()
export class CommentGQL implements CommentTable {
  @Field(() => ID)
  id: number;

  @Field()
  userId: number;

  @Field()
  text: string;

  @Field()
  animeId: number;

  @Field()
  episodeId: number;
}

@ObjectType()
export class AnimeGQL implements Anime {
  @Field()
  synopsis: string;

  @Field()
  duration: string;

  @Field()
  airedDuration: string;

  @Field(() => ID)
  id: number;

  @Field()
  imageUrl: string;

  @Field()
  title: string;

  @Field()
  score: number;

  // @Field(() => [EpisodeGQL])
  // episodes: Episode[];
}

export class EpisodeGQL implements Episode {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  duration: string;

  @Field()
  animeId: number;
}
