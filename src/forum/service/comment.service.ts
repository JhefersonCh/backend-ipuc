import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCommentDto } from '../dto/comment.dto';
import { CommentRepository } from '../../shared/repositories/comment.repository';
import { Comment } from '../../shared/entities/comment.entity';
import { UserService } from '../../user/services/user/user.service';
import { CommentModel } from '../models/commet.model';

@Injectable()
export class CommentService {
  constructor(
    private readonly userService: UserService,
    private readonly commentRepository: CommentRepository,
  ) {}

  async create(createCommentDto: CommentModel): Promise<Comment> {
    await this.userService.findOne(createCommentDto.userId);
    return await this.commentRepository.save(createCommentDto);
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) throw new NotFoundException('Comentario no encontrado');
    return comment;
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { postId, parentId: null },
    });
  }

  async findReplies(parentId: string): Promise<Comment[]> {
    return this.commentRepository.find({ where: { parentId } });
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }

    const updatedComment = {
      ...comment,
      ...updateCommentDto,
      updatedAt: new Date(),
    };

    return await this.commentRepository.save(updatedComment);
  }

  async delete(commentId: string, userId: string): Promise<void> {
    const comment = await this.findOne(commentId);

    if (comment.userId !== userId) {
      throw new ForbiddenException('No puedes eliminar este comentario');
    }

    await this.commentRepository.delete(commentId);
  }
}
