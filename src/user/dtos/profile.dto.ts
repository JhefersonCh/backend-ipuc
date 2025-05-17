import { Post } from './../../shared/entities/post.entity';
import { Comment } from './../../shared/entities/comment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { HttpStatus } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';

export interface StatisticsDto {
  lastPosts: Post[];
  lastComments: {
    replies: Comment[];
    topLevelComments: Comment[];
  };
  comments: {
    total: number;
  };
  likes: {
    total: number;
  };
  posts: {
    total: number;
  };
}

export class StatisticsResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Object,
    example: {
      totalComments: 1,
      totalLikes: 1,
      totalPosts: 1,
    },
  })
  data: StatisticsDto;
}

export class ChangePasswordBaseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}

export class ChangePasswordDto extends ChangePasswordBaseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}
