import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
  @ApiProperty({
    example: 'uuid',
    description: 'ID del post',
    required: true,
  })
  postId: string;

  @ApiProperty({
    example: 'uuid',
    description: 'ID del usuario',
    required: true,
  })
  userId: string;
}
