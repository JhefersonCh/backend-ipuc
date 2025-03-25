import { Injectable } from '@nestjs/common';
import { LikeService } from '../service/like.service';
import { LikeDto } from '../dto/like.dto';

@Injectable()
export class LikeUseCase {
  constructor(private readonly likeService: LikeService) {}

  async create(data: LikeDto, userId: string) {
    return await this.likeService.create(data, userId);
  }

  async delete(postId: string, userId: string) {
    return await this.likeService.delete(postId, userId);
  }
}
