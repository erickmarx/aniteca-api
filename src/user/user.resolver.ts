import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { FavoriteGQL } from 'src/anime/anime.interface';
import { UserGQL } from './user.interface';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserGQL)
  async getUser(@Args('email') email: string): Promise<User> {
    return await this.userService.getUser(email);
  }

  @Mutation(() => UserGQL)
  async createUser(@Args('email') email: string): Promise<User> {
    return await this.userService.createUser(email);
  }

  @Mutation(() => FavoriteGQL)
  async addFavoriteAnime(
    @Args('email') email: string,
    @Args('animeId') animeId: number,
  ) {
    return await this.userService.addFavorite(email, animeId);
  }
}
