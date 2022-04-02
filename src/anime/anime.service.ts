import { Injectable } from '@nestjs/common';
import { Anime, CommentTable } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { JikanService } from 'src/jikan/jikan.service';

@Injectable()
export class AnimeService {
  constructor(
    private jikanService: JikanService,
    private prismaService: PrismaService,
  ) {}

  async addCommentOnAnimeOrEpisode(
    userId: number,
    text: string,
    animeId: number,
    episodeId?: number,
  ): Promise<CommentTable> {
    return await this.prismaService.commentTable.create({
      data: {
        userId: userId,
        animeId: animeId,
        episodeId: episodeId,
        text: text,
      },
    });
  }

  async getAllComments(
    animeId: number,
    episodeId?: number,
  ): Promise<CommentTable[]> {
    return await this.prismaService.commentTable.findMany({
      where: { anime: { id: animeId }, episode: { id: episodeId } },
    });
  }

  async getAllAnimes(): Promise<Anime[]> {
    const jikan = await this.jikanService
      .jikan<{ data: Anime[] }>('anime')
      .then((animes) =>
        animes.data.map(({ id, imageUrl, season, title, score }) => ({
          id,
          imageUrl,
          season,
          title,
          score,
        })),
      );

    // await this.prismaService.anime.create(jikan);
    return await this.prismaService.anime.findMany();
  }
}
