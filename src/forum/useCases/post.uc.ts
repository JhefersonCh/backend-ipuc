import { Injectable } from '@nestjs/common';

import { PostService } from '../service/post.service';
import { PostModel } from '../models/post.model';
import { PaginatedListPostsParamsDto } from '../dto/post.dto';

@Injectable()
export class PostUseCase {
  constructor(private readonly postService: PostService) {}

  async create(createPostDto: PostModel) {
    return await this.postService.create(createPostDto);
  }

  async update(updatePostDto: PostModel) {
    return await this.postService.update(updatePostDto);
  }

  async delete(id: string, userId: string) {
    return await this.postService.delete(id, userId);
  }

  async findById(id: string, userId: string) {
    return await this.postService.findById(id, userId);
  }

  async findAll(userId: string) {
    return await this.postService.findAll(userId);
  }

  async paginatedList(query: PaginatedListPostsParamsDto) {
    return await this.postService.paginatedList(query);
  }
}
