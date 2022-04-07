import { Injectable } from '@nestjs/common';
import { CommentTable } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { AnimeGQL, CommentGQL, EpisodeGQL } from './anime.interface';

@Injectable()
export class AnimeService {
  constructor(private prismaService: PrismaService) {}

  async addCommentOnAnimeOrEpisode(
    email: string,
    text: string,
    animeId: number,
    episodeId?: number,
  ): Promise<CommentTable> {
    return await this.prismaService.commentTable.create({
      data: {
        text,
        anime: { connect: { id: animeId } },
        episode: episodeId ? { connect: { id: episodeId } } : undefined,
        user: { connect: { email: email } },
      },
    });
  }

  async animes(
    animeId?: number,
    title?: string,
    genres?: string[],
    limit?: number,
  ): Promise<
    (AnimeGQL & {
      episodes: EpisodeGQL[];
      comment: CommentGQL[];
    })[]
  > {
    return await this.prismaService.anime.findMany({
      where: {
        id: animeId,
        genres: genres ? { hasSome: genres } : undefined,
        title: title ? { contains: title } : undefined,
      },
      include: { episodes: true, comment: true },
      take: limit,
    });
  }
}
