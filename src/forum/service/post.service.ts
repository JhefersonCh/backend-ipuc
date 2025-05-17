import { Post } from './../../shared/entities/post.entity';
import { PageMetaDto } from './../../shared/dtos/pageMeta.dto';
import { ResponsePaginationDto } from './../../shared/dtos/pagination.dto';
import { UserService } from './../../user/services/user/user.service';
import { PostRepository } from './../../shared/repositories/post.respository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PostModel } from '../models/post.model';
import { PaginatedListPostsParamsDto } from '../dto/post.dto';

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

  async update(updatePostDto: PostModel, role?: string): Promise<void> {
    await this.userService.findOne(updatePostDto.userId);
    await this.userIsCreator(updatePostDto.id, updatePostDto.userId, role);
    await this.postRepository.save(updatePostDto);
  }

  async delete(id: string, userId: string, role?: string) {
    await this.userService.findOne(userId);
    await this.userIsCreator(id, userId, role);
    await this.postRepository.delete(id);
  }

  async userIsCreator(postId: string, userId: string, role?: string) {
    const post = await this.postRepository.findOne({
      where: { id: postId, userId },
    });
    if (!post && role !== 'admin') {
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

  async paginatedList(query: PaginatedListPostsParamsDto) {
    const countQb = this.postRepository.createQueryBuilder('post');

    if (query.title) {
      countQb.andWhere('post.title ILIKE :title', {
        title: `%${query.title}%`,
      });
    }

    if (query.description) {
      countQb.andWhere('post.description ILIKE :description', {
        description: `%${query.description}%`,
      });
    }

    if (query.initialDate || query.finalDate) {
      if (query.initialDate) {
        countQb.andWhere('post.createdAt >= :initialDate', {
          initialDate: query.initialDate,
        });
      }
      if (query.finalDate) {
        countQb.andWhere('post.createdAt <= :finalDate', {
          finalDate: query.finalDate,
        });
      }
    }

    if (query.search) {
      countQb.andWhere(
        '(post.title ILIKE :search OR post.description ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    const count = await countQb.getCount();

    const postsIdsQb = this.postRepository
      .createQueryBuilder('post')
      .select('post.id');

    if (query.title) {
      postsIdsQb.andWhere('post.title ILIKE :title', {
        title: `%${query.title}%`,
      });
    }

    if (query.description) {
      postsIdsQb.andWhere('post.description ILIKE :description', {
        description: `%${query.description}%`,
      });
    }

    if (query.initialDate || query.finalDate) {
      if (query.initialDate) {
        postsIdsQb.andWhere('post.createdAt >= :initialDate', {
          initialDate: query.initialDate,
        });
      }
      if (query.finalDate) {
        postsIdsQb.andWhere('post.createdAt <= :finalDate', {
          finalDate: query.finalDate,
        });
      }
    }

    if (query.search) {
      postsIdsQb.andWhere(
        '(post.title ILIKE :search OR post.description ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    const skip = (query.page - 1) * query.perPage;
    const take = query.perPage;

    postsIdsQb.orderBy('post.createdAt', query.order).skip(skip).take(take);

    const postsIds = await postsIdsQb.getMany();
    const ids = postsIds.map((post) => post.id);

    if (ids.length === 0) {
      const pageMetaDto = new PageMetaDto({
        itemCount: count,
        pageOptionsDto: query,
      });

      return new ResponsePaginationDto([], pageMetaDto);
    }

    const postsQb = this.postRepository
      .createQueryBuilder('post')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.createdAt',
        'post.updatedAt',
        'post.userId',
        'COUNT(DISTINCT comments.id) as commentscount',
        'COUNT(DISTINCT likes.id) as likescount',
      ])
      .leftJoin('post.comments', 'comments')
      .leftJoin('post.likes', 'likes')
      .whereInIds(ids)
      .groupBy('post.id')
      .orderBy('post.createdAt', query.order);

    if (query.userId) {
      postsQb
        .addSelect(
          `CASE 
          WHEN EXISTS (
            SELECT 1 FROM "Like" l WHERE l."postId" = post.id AND l."userId" = :userId
          ) THEN true 
          ELSE false 
        END as hasliked`,
        )
        .setParameter('userId', query.userId);
    }

    const posts = await postsQb.getRawMany();

    const entities = posts.map((post) => ({
      id: post.post_id,
      title: post.post_title,
      description: post.post_description,
      commentsCount: Number(post.commentscount) || 0,
      likesCount: Number(post.likescount) || 0,
      hasLiked: post.hasliked === true || post.hasliked === 'true',
      createdAt: post.post_createdAt,
      updatedAt: post.post_updatedAt,
      userId: post.post_userId,
    }));

    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: query,
    });

    return new ResponsePaginationDto(entities, pageMetaDto);
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

  async getLastPostsForUser(id: string): Promise<Post[]> {
    try {
      const posts = await this.postRepository
        .createQueryBuilder('post')
        .where('post.userId = :id', { id })
        .orderBy('post.createdAt', 'DESC')
        .take(5)
        .getMany();

      return posts;
    } catch (error) {
      console.error('Error al obtener los últimos posts del usuario:', error);
      throw new HttpException(
        'Error al obtener los últimos posts del usuario.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
