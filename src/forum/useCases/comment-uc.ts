import { Injectable } from '@nestjs/common';
import { CommentService } from '../service/comment.service';

@Injectable()
export class CommentUseCase {
  constructor(private readonly commentService: CommentService) {}
}
