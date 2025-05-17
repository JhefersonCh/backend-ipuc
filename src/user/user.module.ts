import { PasswordService } from './services/user/password.service';
import { PostRepository } from './../shared/repositories/post.respository';
import { LikeRepository } from './../shared/repositories/like.repository';
import { CommentRepository } from './../shared/repositories/comment.repository';
import { PostService } from './../forum/service/post.service';
import { LikeService } from './../forum/service/like.service';
import { CommentService } from './../forum/service/comment.service';
import { ProfileUseCase } from './useCases/profile.UC';
import { ProfileService } from './services/user/profile.service';
import { SharedModule } from './../shared/shared.module';
import { ProfileController } from './controllers/user/profile.controller';
import { UserRepository } from './../shared/repositories/user.repository';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { UserUC } from './useCases/user.uc';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UserController, ProfileController],
  imports: [
    SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    UserService,
    UserRepository,
    UserUC,
    UserService,
    ProfileService,
    ProfileUseCase,
    CommentService,
    PasswordService,
    CommentRepository,
    LikeService,
    LikeRepository,
    PostService,
    PostRepository,
  ],
})
export class UserModule {}
