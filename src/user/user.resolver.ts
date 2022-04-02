import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserGQL } from './user.interface';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserGQL])
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Mutation(() => UserGQL)
  async createUser(@Args('id') id: number): Promise<User> {
    return await this.userService.createUser(id);
  }
}
