import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CREATED_MESSAGE } from '../constants/messages.constant';
import { HttpStatus } from '@nestjs/common';
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

export class DeleteFileDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  publicId: string;
}

export class CreatedFileResponseDto {
  @ApiProperty({
    type: String,
  })
  title?: string;

  @ApiProperty({
    type: String,
    example: CREATED_MESSAGE,
  })
  message: string;

  @ApiProperty({
    type: Number,
    example: HttpStatus.CREATED,
  })
  statusCode: number;

  @ApiProperty({
    type: Object,
    example: { url: 'https://example.com', publicId: '123456' },
  })
  data: { url: string; publicId: string };
}
