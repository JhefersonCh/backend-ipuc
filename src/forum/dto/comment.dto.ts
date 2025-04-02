import { Comment } from './../../shared/entities/comment.entity';
import { HttpStatus } from '@nestjs/common';
import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Este es un comentario',
  })
  @IsString()
  @IsNotEmpty({ message: 'El contenido del comentario es requerido' })
  content: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'f3810a52-4d7a-4950-9a0b-135ff9de8375',
    description: 'ID del post al que pertenece el comentario',
  })
  @IsString()
  @IsNotEmpty({ message: 'El postId es requerido' })
  postId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '8d7e1307-e1b5-4f64-ae16-bdcd8afd565d',
    description: 'ID del comentario padre si es una respuesta (opcional)',
  })
  @IsString()
  @IsOptional()
  parentId?: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Comentario actualizado',
  })
  @IsString()
  @IsNotEmpty({ message: 'El contenido del comentario es requerido' })
  content: string;
}

export class GetCommentByIdResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Comment,
    example: ' ',
  })
  data: Comment;

  @ApiProperty({
    type: Number,
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
}

export interface GetPostCommentsResponse extends Comment {
  replies: Comment[];
}

export class GetPostCommentsResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Object,
    example: [
      {
        id: '74876e91-49e8-4a81-a822-1d231386095b',
        userId: '8d7e1307-e1b5-4f64-ae16-adcd8afd565d',
        postId: 'f3810a52-4d7a-4950-9a0b-135ff9de8375',
        content: 'Este es un comentario',
        parentId: null,
        createdAt: '2025-04-03T01:28:32.355Z',
        updatedAt: '2025-04-03T01:28:32.355Z',
        replies: [
          {
            id: 'd3091806-b9e9-4415-8fdc-64c89bea7c9d',
            userId: '8d7e1307-e1b5-4f64-ae16-adcd8afd565d',
            postId: 'f3810a52-4d7a-4950-9a0b-135ff9de8375',
            content: 'Este es una respuesta',
            parentId: '74876e91-49e8-4a81-a822-1d231386095b',
            createdAt: '2025-04-03T01:28:58.724Z',
            updatedAt: '2025-04-03T01:28:58.724Z',
          },
          {
            id: '00c9a270-7f10-4a12-8e4f-cd7b8a9ce3e2',
            userId: 'cd2eb6f3-cb3c-4b9c-bcfa-379ad24684ab',
            postId: 'f3810a52-4d7a-4950-9a0b-135ff9de8375',
            content: 'Esta es una respuesta de otro perfil',
            parentId: '74876e91-49e8-4a81-a822-1d231386095b',
            createdAt: '2025-04-03T01:54:18.134Z',
            updatedAt: '2025-04-03T01:54:18.134Z',
          },
        ],
      },
    ],
  })
  data: GetPostCommentsResponse[];

  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
}
