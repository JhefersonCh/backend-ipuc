import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
    example: '123456',
    description: 'ID del post al que pertenece el comentario',
  })
  @IsString()
  @IsNotEmpty({ message: 'El postId es requerido' })
  postId: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '654321',
    description: 'ID del usuario que realiza el comentario',
  })
  @IsString()
  @IsNotEmpty({ message: 'El userId es requerido' })
  userId: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '987654',
    description: 'ID del comentario padre si es una respuesta (opcional)',
  })
  @IsString()
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
