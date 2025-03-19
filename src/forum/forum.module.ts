import { SharedModule } from 'src/shared/shared.module';
import { UserRepository } from './../shared/repositories/user.repository';
import { UserService } from './../user/services/user/user.service';
import { PostRepository } from './../shared/repositories/post.respository';
import { Module } from '@nestjs/common';
import { ForumController } from './controllers/forum.controller';
import { PostService } from './service/post.service';
import { PostUseCase } from './useCases/post.uc';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ForumController],
  providers: [
    PostService,
    PostUseCase,
    PostRepository,
    UserService,
    UserRepository,
  ],
})
export class ForumModule {}
