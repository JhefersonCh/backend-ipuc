import {
  NOT_FOUND_RESPONSE,
  UPDATED_RESPONSE,
} from './../../../shared/constants/response.constant';
import { ChangePasswordDto } from './../../dtos/profile.dto';
import { UPDATED_MESSAGE } from './../../../shared/constants/messages.constant';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  DuplicatedResponseDto,
  NotFoundResponseDto,
  UpdateRecordResponseDto,
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
  UpdateUserDto,
} from './../../dtos/user.dto';

import { UserUC } from './../../useCases/user.uc';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('Usuarios')
export class UserController {
  constructor(private readonly userUC: UserUC) {}

  @Post('/change-password')
  @ApiOkResponse(UPDATED_RESPONSE)
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() req,
  ): Promise<UpdateRecordResponseDto> {
    await this.userUC.changePassword(body, req.user.id);
    return {
      message: UPDATED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

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

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async update(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<UpdateRecordResponseDto> {
    await this.userUC.update(id, userData);

    return {
      message: 'Usuario actualizado correctamente',
      statusCode: HttpStatus.OK,
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
