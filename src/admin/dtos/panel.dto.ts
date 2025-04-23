import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    description: 'Nombre de la actividad',
    example: 'Nombre de la actividad',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descripción de la actividad',
    example: 'Descripción de la actividad',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Url de la imagen de la actividad',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    description: 'Id público de la imagen',
    example: 'publicId',
  })
  @IsString()
  @IsNotEmpty()
  publicId: string;
}

export class updateActivity extends CreateActivityDto {
  @ApiProperty({
    description: 'Id de la actividad',
    example: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class updateConfiguration {
  @ApiProperty({
    description: 'Logo de la página',
    example: 'https://example.com/logo.jpg',
  })
  @IsString()
  @IsNotEmpty()
  logoUrl: string;

  @ApiProperty({
    description: 'Id público del logo',
    example: 'publicId',
  })
  @IsString()
  @IsNotEmpty()
  logoPublicId: string;

  @ApiProperty({
    description: 'Hero de la página',
    example: 'https://example.com/hero.jpg',
  })
  @IsString()
  @IsNotEmpty()
  heroUrl: string;

  @ApiProperty({
    description: 'Id público del hero',
    example: 'publicId',
  })
  @IsString()
  @IsNotEmpty()
  heroPublicId: string;
}
