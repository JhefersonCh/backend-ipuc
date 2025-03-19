import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
