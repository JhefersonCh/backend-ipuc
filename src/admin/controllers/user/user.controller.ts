import { User } from './../../../shared/entities/user.entity';
import { ResponsePaginationDto } from './../../../shared/dtos/pagination.dto';
import { UserUC } from './../../uc/user.uc';
import { Roles } from './../../../shared/decorators/roles.decorator';
import { RolesGuard } from './../../../shared/guards/roles.guard';
import {
  CreateUserDto,
  GetUserResponseDto,
  PaginatedListUsersParamsDto,
  UpdateUserPanelDto,
} from './../../dtos/user.dto';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  NotFoundResponseDto,
  UnauthorizedResponseDto,
  UpdateRecordResponseDto,
} from './../../../shared/dtos/response.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('manage-users')
@ApiTags('Usuarios - Admin')
export class UserController {
  constructor(private readonly userUC: UserUC) {}

  @Get('paginted-list')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async paginatedList(
    @Query() query: PaginatedListUsersParamsDto,
  ): Promise<ResponsePaginationDto<User>> {
    const users = await this.userUC.paginatedList(query);
    return users;
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getUser(@Param('id') id: string): Promise<GetUserResponseDto> {
    const user = await this.userUC.getUser(id);
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @Patch(':id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserPanelDto,
  ): Promise<UpdateRecordResponseDto> {
    await this.userUC.updateUser(id, body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario actualizado correctamente',
    };
  }

  @Post()
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async createUser(
    @Body() body: CreateUserDto,
  ): Promise<CreatedRecordResponseDto> {
    const user = await this.userUC.createUser(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario creado correctamente',
      data: user,
    };
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async deleteUser(@Param('id') id: string): Promise<DeleteReCordResponseDto> {
    await this.userUC.deleteUser(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario eliminado correctamente',
    };
  }
}
