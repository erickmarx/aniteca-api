import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'database/entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.findAllUsers();
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('id') id: string): Promise<UserEntity> {
    return await this.userService.createUser(id);
  }
}
