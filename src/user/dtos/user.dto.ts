import { User } from './../../shared/entities/user.entity';
import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { NOT_EMPTY_MESSAGE_ID } from './../../shared/constants/validator-messages.const';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { GET_ALL_USER_EXAMPLE } from '../constants/examples.conts';
import { ChangePasswordBaseDto } from './profile.dto';

export class BaseUserDto {
  @ApiProperty({
    example: 'uuid',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: NOT_EMPTY_MESSAGE_ID })
  id: string;

  @ApiProperty({
    example: 'Jheferson',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  firstName: string;

  @ApiProperty({
    example: 'Checa',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  lastName: string;

  @ApiProperty({
    example: 'jheferson@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({
    example: 'Jheff',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  username: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'https://www.example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty({ message: 'La confirmación de contraseña es requerida' })
  confirmPassword: string;
}

export class CreateOrUpdateUserDto extends BaseUserDto {
  @ApiProperty({
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty({ message: 'El rol es requerido' })
  role: string;
}

export interface GetAllUsersRespose {
  users: User[];
}

export class GetAllUsersResposeDto implements BaseResponseDto {
  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: Array,
    example: GET_ALL_USER_EXAMPLE,
  })
  data: GetAllUsersRespose;
}

export class GetUserDto implements BaseResponseDto {
  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: Object,
    example: GET_ALL_USER_EXAMPLE,
  })
  data: User;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'Jheferson',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  firstName: string;

  @ApiProperty({
    example: 'Checa',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  lastName: string;

  @ApiProperty({
    example: 'jheferson@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'www.example.com',
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({
    example: 'Jheff',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  username: string;
}

export class RecoveryPasswordDto extends ChangePasswordBaseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({
    type: String,
    required: true,
    example: 'token',
  })
  @IsString()
  @IsNotEmpty()
  resetToken: string;
}
