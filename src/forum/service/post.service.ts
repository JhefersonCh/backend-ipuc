import { UserService } from './../../user/services/user/user.service';
import { PostRepository } from './../../shared/repositories/post.respository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PostModel } from '../models/post.model';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
  ) {}

  async create(createPostDto: PostModel): Promise<{ rowId: string }> {
    await this.userService.findOne(createPostDto.userId);
    const res = await this.postRepository.save(createPostDto);
    return { rowId: res.id };
  }

  async update(updatePostDto: PostModel): Promise<void> {
    await this.userService.findOne(updatePostDto.userId);
    await this.userIsCreator(updatePostDto.id, updatePostDto.userId);
    await this.postRepository.save(updatePostDto);
  }

  async delete(id: string, userId: string) {
    await this.userService.findOne(userId);
    await this.userIsCreator(id, userId);
    await this.postRepository.delete(id);
  }

  async userIsCreator(postId: string, userId: string) {
    const post = await this.postRepository.findOne({
      where: { id: postId, userId },
    });
    if (!post) {
      throw new HttpException(
        'El post no existe o no eres el creador',
        HttpStatus.NOT_FOUND,
      );
    }
    return post;
  }

  async findByParams(
    params: Record<string, any>,
    relations: string[] = [],
  ): Promise<any> {
    const post = await this.postRepository.findOne({
      where: [params],
      relations,
    });
    if (!post) {
      throw new HttpException('El post no existe', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async findAll(userId: string) {
    const qb = this.postRepository
      .createQueryBuilder('post')
      .select([
        'post',
        'COUNT(DISTINCT comments.id) as commentscount',
        'COUNT(DISTINCT likes.id) as likescount',
      ]);

    if (userId) {
      qb.addSelect(
        `CASE 
         WHEN EXISTS (
           SELECT 1 FROM "Like" l WHERE l."postId" = post.id AND l."userId" = :userId
         ) THEN true 
         ELSE false 
       END as hasLiked`,
      ).setParameter('userId', userId);
    }

    qb.leftJoin('post.comments', 'comments').leftJoin('post.likes', 'likes');

    qb.groupBy('post.id').orderBy('post.createdAt', 'DESC');

    const posts = await qb.getRawMany();

    return posts.map((post) => ({
      id: post.post_id,
      title: post.post_title,
      description: post.post_description,
      commentsCount: Number(post.commentscount) || 0,
      likesCount: Number(post.likescount) || 0,
      hasLiked: post.hasliked,
      createdAt: post.post_createdAt,
      updatedAt: post.post_updatedAt,
      userId: post.post_userId,
    }));
  }

  async findById(id: string, userId: string) {
    const qb = this.postRepository
      .createQueryBuilder('post')
      .select([
        'post',
        'COUNT(DISTINCT comments.id) as commentscount',
        'COUNT(DISTINCT likes.id) as likescount',
      ]);

    if (userId) {
      qb.addSelect(
        `CASE 
          WHEN EXISTS (
            SELECT 1 FROM "Like" l WHERE l."postId" = post.id AND l."userId" = :userId
          ) THEN true 
          ELSE false 
        END as hasLiked`,
      ).setParameter('userId', userId);
    }

    qb.leftJoin('post.comments', 'comments')
      .leftJoin('post.likes', 'likes')
      .where('post.id = :id', { id })
      .groupBy('post.id');

    const post = await qb.getRawOne();

    if (!post) {
      throw new HttpException('El post no existee', HttpStatus.NOT_FOUND);
    }

    return {
      id: post.post_id,
      title: post.post_title,
      description: post.post_description,
      userId: post.post_userId,
      createdAt: post.post_createdAt,
      updatedAt: post.post_updatedAt,
      commentsCount: Number(post['commentscount']) || 0,
      likesCount: Number(post['likescount']) || 0,
      hasLiked: post['hasliked'],
    };
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new HttpException('El post no existe', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async getPostsCountForUser(id: string): Promise<{ total: number }> {
    try {
      const total = await this.postRepository
        .createQueryBuilder('post')
        .where('post.userId = :id', { id })
        .getCount();

      return { total };
    } catch (error) {
      console.error('Error al obtener el conteo de posts:', error);
      throw new HttpException(
        'Error al obtener el conteo de publicaciones del usuario.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
