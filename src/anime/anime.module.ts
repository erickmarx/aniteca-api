import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'database/entities/comment.entity';
import { AnimeService } from './anime.service';
import { AnimeResolver } from './anime.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [AnimeService, AnimeResolver],
})
export class AnimeModule {}
