import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUser(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({ where: { email } });
  }

  async createUser(email: string): Promise<User> {
    return (
      (await this.prismaService.user.findFirst({ where: { email } })) ??
      (await this.prismaService.user.create({ data: { email } }))
    );
  }

  async addFavorite(email: string, animeId: number) {
    return await this.prismaService.user.create({
      data: {
        email,
        Favorite: { create: { anime: { connect: { id: animeId } } } },
      },
    });
  }
}
