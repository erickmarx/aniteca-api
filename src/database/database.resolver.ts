import { Resolver, Args, Query } from '@nestjs/graphql';
import { DatabaseService } from './database.service';

@Resolver()
export class DatabaseResolver {
  constructor(private databaseService: DatabaseService) {}

  /*------------------------------------------------------
                            Query
   ------------------------------------------------------*/
  @Query(() => String)
  async fillDatabase(
    @Args('anime', { nullable: true, defaultValue: false }) anime: boolean,
    @Args('episode', { nullable: true, defaultValue: false }) episodes: boolean,
  ): Promise<string> {
    await this.databaseService.fillDatabase(anime, episodes);
    return 'done';
  }
}
