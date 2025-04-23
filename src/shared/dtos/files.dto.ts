import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  file: any;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  fileName: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  folder: string;
}
