import { CommentRepository } from './../../shared/repositories/comment.repository';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentDto } from '../dto/comment.dto';
import { CommentModel } from '../models/commet.model';

@Injectable()
export class CommentUseCase {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentRepository: CommentRepository,
  ) {}

  async createComment(dto: CommentDto): Promise<CommentModel> {
    return this.commentService.create(dto);
  }

  async getCommentById(id: string): Promise<CommentModel> {
    return this.commentService.findOne(id);
  }

  async getCommentsByPost(postId: string): Promise<CommentModel[]> {
    return this.commentService.findByPost(postId);
  }

  async getRepliesByComment(parentId: string): Promise<CommentModel[]> {
    return this.commentService.findReplies(parentId);
  }

  async updateComment(id: string, dto: CommentDto): Promise<CommentModel> {
    return this.commentService.update(id, dto);
  }

  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('No puedes eliminar este comentario');
    }

    await this.commentRepository.delete(commentId);
  }
}
