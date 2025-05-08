import { User } from './../../shared/entities/user.entity';
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

export class GetUserResponseDto implements BaseResponseDto {
  @ApiProperty({ type: Number, example: HttpStatus.OK })
  statusCode: number;

  @ApiProperty({ type: Object })
  data: User;
}

export class CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({
    type: String,
    example: 'John',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    type: String,
    example: '@john.doe',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    type: String,
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: String,
    example: 'role',
  })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @IsString()
  @IsOptional()
  password?: string;
}

export class UpdateUserDto extends CreateUserDto {
  @ApiProperty({
    type: String,
    example: 'id del usuario',
  })
  @IsString()
  @IsOptional()
  id?: string;
}
