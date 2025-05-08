import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ParamsPaginationDto } from './../../shared/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class PaginatedListUsersParamsDto extends ParamsPaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '@john.doe',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'role',
  })
  @IsString()
  @IsOptional()
  role?: string;
}
