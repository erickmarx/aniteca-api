import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentTable } from '@prisma/client';
import { AnimeGQL, CommentGQL } from './anime.interface';
import { AnimeService } from './anime.service';

@Resolver()
export class AnimeResolver {
  constructor(private animeService: AnimeService) {}

  /*------------------------------------------------------
                            Query
   ------------------------------------------------------*/
  @Query(() => [CommentGQL])
  async getAllComments(
    @Args('anime') animeId: number,
    @Args('episode', { nullable: true }) episodeId?: number,
  ): Promise<CommentTable[]> {
    return await this.animeService.getAllComments(animeId, episodeId);
  }

  @Query(() => [AnimeGQL])
  async getAllAnimes(
    @Args('animeId', { nullable: true }) animeId?: number,
  ): Promise<AnimeGQL[]> {
    return await this.animeService.getAllAnimes(animeId);
  }

  /*------------------------------------------------------
                            Mutation
   ------------------------------------------------------*/
  @Mutation(() => CommentGQL)
  async addCommentOnAnimeOrEpisode(
    @Args('userId') userId: number,
    @Args('text') text: string,
    @Args('anime') anime: number,
    @Args('episode', { nullable: true }) episode?: number,
  ): Promise<CommentTable> {
    return await this.animeService.addCommentOnAnimeOrEpisode(
      userId,
      text,
      anime,
      episode,
    );
  }
}
