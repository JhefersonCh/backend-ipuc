import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
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
  Delete,
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: GetAllUsersResposeDto })
  async findAll(): Promise<GetAllUsersResposeDto> {
    const users = await this.userUC.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: { users },
    };
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
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
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: GetUserDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async findOne(@Param('id') id: string): Promise<GetUserDto> {
    const user = await this.userUC.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async delete(@Param('id') id: string): Promise<DeleteReCordResponseDto> {
    await this.userUC.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario eliminado exitosamente',
    };
  }
}
