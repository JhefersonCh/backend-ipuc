import { UserUC } from './../../uc/user.uc';
import { Roles } from './../../../shared/decorators/roles.decorator';
import { RolesGuard } from './../../../shared/guards/roles.guard';
import { PaginatedListUsersParamsDto } from './../../dtos/user.dto';
import { UnauthorizedResponseDto } from './../../../shared/dtos/response.dto';
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
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
  async paginatedList(@Query() query: PaginatedListUsersParamsDto) {
    const users = await this.userUC.paginatedList(query);
    return {
      statusCode: HttpStatus.OK,
      data: users,
    };
  }
}
