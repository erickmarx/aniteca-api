import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeResolver } from './anime.resolver';
import { JikanModule } from 'src/jikan/jikan.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AnimeModule, JikanModule, PrismaModule, ScheduleModule.forRoot()],
  providers: [AnimeService, AnimeResolver],
})
export class AnimeModule {}
