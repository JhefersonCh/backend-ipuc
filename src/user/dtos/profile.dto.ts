import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { HttpStatus } from '@nestjs/common';

export interface StatisticsDto {
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
