import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Anime, CommentTable, Episode } from '@prisma/client';
import fluent from 'fluent-iterable';
import { PrismaService } from 'prisma/prisma.service';
import { JikanService } from 'src/jikan/jikan.service';
import { getAllAnimes } from './anime.interface';

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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async fillDatabaseWithAnimes(page = 0) {
    console.time('fillDatabaseWithAnime');
    await this.prismaService.anime.createMany({
      skipDuplicates: true,
      data: await fluent(Array(20))
        .mapAsync(
          async (): Promise<getAllAnimes[]> =>
            await this.jikanService
              .jikan<{ data: getAllAnimes[] }>(`top/anime?page=${page++ + 1}`)
              .then((animes) => animes.data),
        )
        .toArray()
        .then((jikan) =>
          jikan.flat().map(
            ({
              mal_id,
              images: {
                webp: { image_url },
              },
              score,
              title,
              duration,
              aired,
              synopsis,
            }): Anime => {
              return {
                id: mal_id,
                imageUrl: image_url,
                airedDuration: aired.string,
                duration,
                synopsis,
                score,
                title,
              };
            },
          ),
        ),
    });
    console.timeEnd('fillDatabaseWithAnime');
  }

  async getAllAnimes(animeId?: number): Promise<
    (Anime & {
      episodes: Episode[];
    })[]
  > {
    // this.fillDatabaseWithAnimes();
    return await this.prismaService.anime.findMany({
      where: { id: animeId },
      include: { episodes: true },
    });
  }
}
