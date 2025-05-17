import { ParamsPaginationDto } from './../../shared/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    type: String,
    description: 'Nombre de la actividad',
    example: 'Nombre de la actividad',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Descripción de la actividad',
    example: 'Descripción de la actividad',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: String,
    description: 'Url de la imagen de la actividad',
    example: 'https://example.com/image.jpg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    type: String,
    description: 'Id público de la imagen',
    example: 'publicId',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  publicId: string;
}

export class updateActivity extends CreateActivityDto {
  @ApiProperty({
    type: String,
    description: 'Id de la actividad',
    example: 'uuid',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class CreateEventDto extends CreateActivityDto {
  @ApiProperty({
    type: String,
    description: 'Id de la actividad',
    example: 'uuid',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  activityId: string;

  @ApiProperty({
    type: Date,
    description: 'Fecha del evento',
    example: '2022-01-01:00:00:00',
    format: 'date-time',
    required: true,
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;
}

export class updateEvent extends CreateEventDto {
  @ApiProperty({
    type: String,
    description: 'Id del evento',
    example: 'uuid',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class PaginatedListEventsParamsDto extends ParamsPaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'John',
  })
  @IsString()
  @IsOptional()
  activityId?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'John',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'John',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Date,
    required: false,
    example: '2022-01-01:00:00:00',
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  initDate?: Date;

  @ApiProperty({
    type: Date,
    required: false,
    example: '2022-01-01:00:00:00',
    format: 'date-time',
  })
  @IsDate()
  @IsOptional()
  endDate?: Date;
}
