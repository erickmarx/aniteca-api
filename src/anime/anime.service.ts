import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'database/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async addCommentOnAnimeOrEpisode(
    userId: string,
    text: string,
    anime: number,
    episode?: number,
  ): Promise<CommentEntity> {
    return await this.commentRepository.save({
      user: { id: userId },
      anime: anime,
      episode: episode ?? null,
      text: text,
    });
  }

  async getAllComments(
    anime: number,
    episode?: number,
  ): Promise<CommentEntity[]> {
    return await this.commentRepository.find({
      where: { anime: anime, episode: episode ?? null },
    });
  }
}
