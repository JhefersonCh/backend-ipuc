import {
  CreatedRecordResponseDto,
  DuplicatedResponseDto,
  NotFoundResponseDto,
} from './../../../shared/dtos/response.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetAllUsersResposeDto,
  GetUserDto,
  BaseUserDto,
  CreateOrUpdateUserDto,
} from './../../dtos/user.dto';

import { UserUC } from './../../useCases/user.uc';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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
  async create(
    @Body() user: CreateOrUpdateUserDto,
  ): Promise<CreatedRecordResponseDto> {
    const rowId = await this.userUC.create(user);
    return {
      message: 'Usuario creado correctamente',
      statusCode: HttpStatus.CREATED,
      data: rowId,
    };
  }

  @Post('register')
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiConflictResponse({ type: DuplicatedResponseDto })
  async register(@Body() user: BaseUserDto): Promise<CreatedRecordResponseDto> {
    const rowId = await this.userUC.register(user);
    return {
      message: 'Registro exitoso',
      statusCode: HttpStatus.CREATED,
      data: rowId,
    };
  }

  @Get('init-data')
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async initData(@Req() req) {
    const initData = await this.userUC.initData(req.user.id);
    return {
      statusCode: HttpStatus.OK,
      data: initData,
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
