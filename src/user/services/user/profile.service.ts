import { PasswordService } from './password.service';
import { UserRepository } from './../../../shared/repositories/user.repository';
import { PostService } from './../../../forum/service/post.service';
import { LikeService } from './../../../forum/service/like.service';
import { CommentService } from './../../../forum/service/comment.service';
import { StatisticsDto } from './../../dtos/profile.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _passwordService: PasswordService,
    private readonly _commentService: CommentService,
    private readonly _likeService: LikeService,
    private readonly _postService: PostService,
  ) {}

  async getStatistics(id: string): Promise<StatisticsDto> {
    const lastComments =
      await this._commentService.getLastCommentsReplyForUser(id);

    const comments = await this._commentService.getCommentsCountForUser(id);

    const likes = await this._likeService.getLikesCountForUser(id);

    const posts = await this._postService.getPostsCountForUser(id);

    const lastPosts = await this._postService.getLastPostsForUser(id);
    return {
      lastPosts,
      lastComments,
      comments,
      likes,
      posts,
    };
  }
}
