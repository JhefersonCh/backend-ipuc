import { Injectable } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { UpdateCommentDto } from '../dto/comment.dto';
import { Comment } from '../../shared/entities/comment.entity';
import { CommentModel } from '../models/commet.model';

@Injectable()
export class CommentUseCase {
  constructor(private readonly commentService: CommentService) {}

  async create(createCommentDto: CommentModel): Promise<Comment> {
    return await this.commentService.create(createCommentDto);
  }

  async get(id: string): Promise<Comment> {
    return await this.commentService.findOne(id);
  }

  async getPost(postId: string): Promise<Comment[]> {
    return await this.commentService.findByPost(postId);
  }

  async getRepliesByComment(parentId: string): Promise<Comment[]> {
    return await this.commentService.findReplies(parentId);
  }

  async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
    return await this.commentService.update(id, dto);
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.commentService.delete(id, userId);
  }
}
