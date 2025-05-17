import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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

export class updateGeneralInfo {
  @ApiProperty({
    description: 'Nombre de la página',
    example: 'Nombre de la página',
  })
  @IsString()
  @IsNotEmpty()
  appName: string;

  @ApiProperty({
    description: 'Logo de la página',
    example: 'Logo de la página',
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
}
