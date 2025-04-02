import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from '../../shared/repositories/comment.repository';
import { Comment } from '../../shared/entities/comment.entity';
import { UserService } from '../../user/services/user/user.service';
import { CommentModel } from '../models/commet.model';
import { PostService } from './post.service';
import { GetPostCommentsResponse } from '../dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly userService: UserService,
    private readonly commentRepository: CommentRepository,
    private readonly postService: PostService,
  ) {}

  async create(commentDto: CommentModel): Promise<{ rowId: string }> {
    await this.userService.findOne(commentDto.userId);
    await this.postService.findOne(commentDto.postId);
    commentDto.parentId && (await this.findOne(commentDto.parentId));
    return {
      rowId: (await this.commentRepository.insert(commentDto)).identifiers[0]
        .id,
    };
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('El comentario no existe');
    return comment;
  }

  async findByPost(postId: string): Promise<GetPostCommentsResponse[]> {
    await this.postService.findOne(postId);
    return this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.replies', 'reply')
      .where('comment.postId = :postId', { postId })
      .andWhere('comment.parentId IS NULL')
      .getMany();
  }

  async update(commentDto: Partial<CommentModel>): Promise<void> {
    const comment = await this.findOne(commentDto.id);
    if (comment.userId !== commentDto.userId) {
      throw new ForbiddenException('No puedes editar este comentario');
    }
    await this.commentRepository.update({ id: comment.id }, commentDto);
  }

  async delete(commentId: string, userId: string): Promise<void> {
    const comment = await this.findOne(commentId);
    if (comment.userId !== userId) {
      throw new ForbiddenException('No puedes eliminar este comentario');
    }
    await this.commentRepository.delete({ id: commentId });
  }
}
