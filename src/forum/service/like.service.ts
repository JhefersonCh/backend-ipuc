import { LikeRepository } from './../../shared/repositories/like.repository';
import { Injectable } from '@nestjs/common';
import { LikeDto } from '../dto/like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  async create(data: LikeDto, userId: string) {
    const likeBody = { ...data, userId };
    return await this.likeRepository.save(likeBody);
  }

  async delete(postId: string, userId: string) {
    const likeExists = await this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
    if (!likeExists) {
      return;
    }
    return await this.likeRepository.delete({ id: likeExists.id });
  }
}
