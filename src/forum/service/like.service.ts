import { LikeRepository } from './../../shared/repositories/like.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getLikesCountForUser(id: string): Promise<{ total: number }> {
    try {
      const total = await this.likeRepository
        .createQueryBuilder('like')
        .where('like.userId = :id', { id })
        .getCount();

      return { total };
    } catch (error) {
      console.error('Error al obtener el conteo de likes:', error);
      throw new HttpException(
        'Error al obtener el conteo de likes del usuario.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
