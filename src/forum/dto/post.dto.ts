import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'Titulo del post',
  })
  @IsString()
  @IsNotEmpty({ message: 'El titulo es requerido' })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'Descripción del post',
  })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;
}

export class UpdatePostDto extends CreatePostDto {}

export class GetAllPostsDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'Id del usuario',
  })
  @IsString()
  @IsOptional()
  userId?: string;
}
