import { Controller, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto, UpdateCommentDto } from '../dto/comment.dto';
import { CommentModel } from '../models/commet.model';

@ApiTags('Comments')
@Controller('comments')
@Injectable()
export class CommentService {
  private comments: CommentModel[] = [];

  async create(commentDto: CommentDto): Promise<CommentModel> {
    const newComment: CommentModel = {
      id: Date.now().toString(),
      ...commentDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.comments.push(newComment);
    return newComment;
  }

  async findOne(id: string): Promise<CommentModel> {
    return this.comments.find((comment) => comment.id === id);
  }

  async findByPost(postId: string): Promise<CommentModel[]> {
    return this.comments.filter(
      (comment) => comment.postId === postId && !comment.parentId,
    );
  }

  async findReplies(parentId: string): Promise<CommentModel[]> {
    return this.comments.filter((comment) => comment.parentId === parentId);
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentModel> {
    const index = this.comments.findIndex((comment) => comment.id === id);
    if (index === -1) return null;
    this.comments[index] = {
      ...this.comments[index],
      ...updateCommentDto,
      updatedAt: new Date(),
    };
    return this.comments[index];
  }

  async remove(id: string): Promise<void> {
    this.comments = this.comments.filter((comment) => comment.id !== id);
  }
}
