import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LikeDto {
  @ApiProperty({
    example: 'uuid',
    description: 'ID del post',
    required: true,
  })
  @IsNotEmpty({ message: 'El ID del post es requerido' })
  @IsString()
  postId: string;
}
