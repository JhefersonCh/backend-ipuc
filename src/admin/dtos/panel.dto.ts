import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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

export class updateHome {
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

  @ApiProperty({
    description: 'Titulo de la página',
    example: 'Titulo de la página',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descripción de la página',
    example: 'Descripción de la página',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Nombre de la página',
    example: 'Nombre de la página',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Titulo adicional de la página',
    example: 'Titulo adicional de la página',
  })
  @IsString()
  @IsNotEmpty()
  additionalTitle: string;

  @ApiProperty({
    description: 'Descripción adicional de la página',
    example: 'Descripción adicional de la página',
  })
  @IsString()
  @IsNotEmpty()
  additionalDescription: string;

  @ApiProperty({
    description: 'Habilitar redirección a IPUC',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  enableRedirectToIpuc: boolean;
}

export class updateAbout {
  @ApiProperty({
    description: 'Mission de la página',
    example: 'Mission de la página',
  })
  @IsString()
  @IsNotEmpty()
  mission: string;

  @ApiProperty({
    description: 'Vision de la página',
    example: 'Vision de la página',
  })
  @IsString()
  @IsNotEmpty()
  vision: string;

  @ApiProperty({
    description: 'Ubicación de la página',
    example: 'Ubicación de la página',
  })
  @IsString()
  @IsNotEmpty()
  ubicationUrl: string;

  @ApiProperty({
    description: 'Ubicación de la página',
    example: 'Ubicación de la página',
  })
  @IsString()
  @IsNotEmpty()
  ubicationCoordinates: string;

  @ApiProperty({
    description: 'Habilitar redirección a Google Maps',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  enableRedirectToGoogleMaps: boolean;
}
