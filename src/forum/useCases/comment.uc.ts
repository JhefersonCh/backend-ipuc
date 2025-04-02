import { Injectable } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { GetPostCommentsResponse } from '../dto/comment.dto';
import { Comment } from '../../shared/entities/comment.entity';
import { CommentModel } from '../models/commet.model';

@Injectable()
export class CommentUseCase {
  constructor(private readonly commentService: CommentService) {}

  async create(createCommentDto: CommentModel): Promise<{ rowId: string }> {
    return await this.commentService.create(createCommentDto);
  }

  async findOne(id: string): Promise<Comment> {
    return await this.commentService.findOne(id);
  }

  async findByPost(postId: string): Promise<GetPostCommentsResponse[]> {
    return await this.commentService.findByPost(postId);
  }

  async update(dto: Partial<CommentModel>): Promise<void> {
    return await this.commentService.update(dto);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.commentService.delete(id, userId);
  }
}
