import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async createUser(id: number): Promise<User> {
    return await this.prismaService.user.create({ data: { id: id } });
  }
}
