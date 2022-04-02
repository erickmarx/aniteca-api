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
    @Args('anime') anime: number,
    @Args('episode', { nullable: true }) episode?: number,
  ): Promise<CommentTable[]> {
    return await this.animeService.getAllComments(anime, episode);
  }

  @Query(() => [AnimeGQL])
  async getAllAnimes(): Promise<AnimeGQL[]> {
    return await this.animeService.getAllAnimes();
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
