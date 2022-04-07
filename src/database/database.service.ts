import { Cron, CronExpression } from '@nestjs/schedule';
import { Anime, Episode } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {
  getAllAnimes,
  getAllEpisodesFromAnime,
} from 'src/anime/anime.interface';
import { JikanService } from 'src/jikan/jikan.service';
import { setTimeout } from 'timers/promises';

export class DatabaseService {
  constructor(
    private jikanService: JikanService,
    private prismaService: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async fillDatabase(anime: boolean, episodes: boolean): Promise<void> {
    console.time('fillDatabaseWithAnime');
    if (anime) this.#fillDatabaseWithAnimes;
    if (episodes) this.#fillDatabaseWithEpisodes;
    console.timeEnd('fillDatabaseWithAnime');
  }

  async #fillDatabaseWithAnimes(page = 0, totalPages = 2): Promise<void> {
    for (const _ of Array(totalPages)) {
      await this.prismaService.anime.createMany({
        skipDuplicates: true,
        data: await this.jikanService
          .jikan<{ data: getAllAnimes[] }>(`top/anime?page=${page++ + 1}`)
          .then(({ data }) =>
            data.map(
              (data): Anime => ({
                id: data.mal_id,
                imageUrl: data.images.webp.image_url,
                airedDuration: data.aired.string,
                duration: data.duration,
                synopsis: data.synopsis,
                score: data.score,
                title: data.title,
                genres: data.genres.map(({ name }) => name.toLowerCase()),
              }),
            ),
          ),
      });
    }
  }

  async #fillDatabaseWithEpisodes(): Promise<void> {
    for (const { id: animeId } of await this.prismaService.anime.findMany({
      where: { episodes: { none: {} } },
    })) {
      await setTimeout(
        500,
        await this.prismaService.episode.createMany({
          skipDuplicates: true,
          data: await this.jikanService
            .jikan<{
              data: getAllEpisodesFromAnime[];
            }>(`anime/${animeId}/episodes`)
            .then(({ data }) =>
              data?.map(
                ({ mal_id, title }): Omit<Episode, 'id'> => ({
                  number: mal_id,
                  title,
                  animeId,
                }),
              ),
            ),
        }),
      );
    }
  }
}
