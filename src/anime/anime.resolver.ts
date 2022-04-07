import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnimeGQL, CommentGQL } from './anime.interface';
import { AnimeService } from './anime.service';

@Resolver()
export class AnimeResolver {
  constructor(private animeService: AnimeService) {}

  /*------------------------------------------------------
                            Query
   ------------------------------------------------------*/

  @Query(() => [AnimeGQL])
  async animes(
    @Args('animeId', { nullable: true }) animeId?: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('genres', { nullable: true, type: () => [String] }) genres?: string[],
    @Args('limit', { nullable: true }) limit?: number,
  ): Promise<AnimeGQL[]> {
    return await this.animeService.animes(animeId, title, genres, limit);
  }

  /*------------------------------------------------------
                            Mutation
   ------------------------------------------------------*/
  @Mutation(() => CommentGQL)
  async addCommentOnAnimeOrEpisode(
    @Args('email') email: string,
    @Args('text') text: string,
    @Args('anime') anime: number,
    @Args('episode', { nullable: true }) episode?: number,
  ): Promise<CommentGQL> {
    return await this.animeService.addCommentOnAnimeOrEpisode(
      email,
      text,
      anime,
      episode,
    );
  }
}
