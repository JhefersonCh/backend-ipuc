import {
  CreatedRecordResponseDto,
  DuplicatedResponseDto,
  NotFoundResponseDto,
} from './../../../shared/dtos/response.dto';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetAllUsersResposeDto,
  GetUserDto,
  UserDto,
} from './../../dtos/user.dto';

import { UserUC } from './../../useCases/user.uc';
import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';

@Controller('user')
@ApiTags('Usuarios')
export class UserController {
  constructor(private readonly userUC: UserUC) {}

  @Get()
  @ApiOkResponse({ type: GetAllUsersResposeDto })
  async findAll(): Promise<GetAllUsersResposeDto> {
    const users = await this.userUC.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: { users },
    };
  }

  @Post()
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiConflictResponse({ type: DuplicatedResponseDto })
  async create(@Body() user: UserDto): Promise<CreatedRecordResponseDto> {
    const rowId = await this.userUC.create(user);
    return {
      message: 'Usuario creado correctamente',
      statusCode: HttpStatus.CREATED,
      data: rowId,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: GetUserDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    const user = await this.userUC.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }
}
