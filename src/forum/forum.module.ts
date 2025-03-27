import { CommentRepository } from './../shared/repositories/comment.repository';
import { LikeRepository } from './../shared/repositories/like.repository';
import { SharedModule } from 'src/shared/shared.module';
import { UserRepository } from './../shared/repositories/user.repository';
import { UserService } from './../user/services/user/user.service';
import { PostRepository } from './../shared/repositories/post.respository';
import { Module } from '@nestjs/common';
import { ForumController } from './controllers/forum.controller';
import { PostService } from './service/post.service';
import { PostUseCase } from './useCases/post.uc';
import { PassportModule } from '@nestjs/passport';
import { LikeController } from './controllers/like.controller';
import { CommentController } from './controllers/comment.controller';
import { LikeUseCase } from './useCases/like.uc';
import { LikeService } from './service/like.service';
import { CommentUseCase } from './useCases/comment.uc';
import { CommentService } from './service/comment.service';

@Module({
  imports: [
    SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ForumController, LikeController, CommentController],
  providers: [
    PostService,
    PostUseCase,
    LikeUseCase,
    LikeService,
    LikeRepository,
    PostRepository,
    UserService,
    UserRepository,
    CommentUseCase,
    CommentService,
    CommentRepository,
  ],
})
export class ForumModule {}
