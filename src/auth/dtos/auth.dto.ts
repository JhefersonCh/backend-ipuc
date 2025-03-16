import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Nombre de usuario',
    example: 'username',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Contraseña',
    example: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}

export class RefreshTokenBodyDto {
  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class SignOutBodyDto {
  @ApiProperty({
    example: '7985544c-4659-49f3-8d1c-42602a1c765b',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
