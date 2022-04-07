import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Anime, CommentTable, Episode, Favorite } from '@prisma/client';

@ObjectType()
export class getAllAnimes {
  mal_id: number;
  images: { webp: { image_url: string } };
  title: string;
  score: number;
  synopsis?: string;
  duration?: string;
  aired: { string: string };
  genres: { name: string }[];
}

export class getAllEpisodesFromAnime {
  mal_id: number;
  title: string;
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
  @Field(() => ID)
  id: number;

  @Field()
  synopsis: string;

  @Field()
  duration: string;

  @Field()
  airedDuration: string;

  @Field()
  imageUrl: string;

  @Field()
  title: string;

  @Field()
  score: number;

  @Field(() => [String])
  genres: string[];

  @Field(() => [EpisodeGQL])
  episodes: EpisodeGQL[];

  @Field(() => [CommentGQL])
  comment: CommentGQL[];
}

@ObjectType()
export class EpisodeGQL implements Episode {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  number: number;

  @Field()
  animeId: number;
}

@ObjectType()
export class FavoriteGQL implements Favorite {
  @Field(() => ID)
  id: number;

  @Field()
  userId: number;

  @Field()
  animeId: number;
}
