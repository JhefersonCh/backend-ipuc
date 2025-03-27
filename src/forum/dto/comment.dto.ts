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
    required: true,
    example: '8d7e1307-e1b5-4f64-ae16-adcd8afd565d',
    description: 'ID del usuario que realiza el comentario',
  })
  @IsString()
  @IsNotEmpty({ message: 'El userId es requerido' })
  userId: string;

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

  @ApiProperty({
    type: String,
    required: false,
    example: '8d7e1307-e1b5-4f64-ae16-bdcd8afd565d',
    description: 'ID del usuario que actualiza el comentario',
  })
  @IsString()
  @IsOptional()
  userId?: string;
}

export class GetCommentByIdResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Object,
    example: ' ',
  })
  data: Comment;
  @ApiProperty({
    type: Number,
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;
}
