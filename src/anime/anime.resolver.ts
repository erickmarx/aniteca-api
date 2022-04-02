import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentEntity } from 'database/entities/comment.entity';
import { AnimeService } from './anime.service';

@Resolver()
export class AnimeResolver {
  constructor(private animeService: AnimeService) {}

  @Query(() => [CommentEntity])
  async getAllComments(
    @Args('anime') anime: number,
    @Args('episode', { nullable: true }) episode?: number,
  ): Promise<CommentEntity[]> {
    return await this.animeService.getAllComments(anime, episode);
  }

  @Mutation(() => CommentEntity)
  async addCommentOnAnimeOrEpisode(
    @Args('userId') userId: string,
    @Args('text') text: string,
    @Args('anime') anime: number,
    @Args('episode', { nullable: true }) episode?: number,
  ) {
    return await this.animeService.addCommentOnAnimeOrEpisode(
      userId,
      text,
      anime,
      episode,
    );
  }
}
