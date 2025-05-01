import { Roles } from './../../../shared/decorators/roles.decorator';
import { RolesGuard } from './../../../shared/guards/roles.guard';
import {
  CreateActivityDto,
  updateActivity,
  updateConfiguration,
} from './../../dtos/panel.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  UnauthorizedResponseDto,
  UpdateRecordResponseDto,
} from './../../../shared/dtos/response.dto';
import { PanelUC } from './../../uc/panel.uc';

import {
  Controller,
  UseGuards,
  Post,
  Body,
  Patch,
  HttpStatus,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('panel')
@ApiTags('Panel de Administrador')
export class PanelController {
  constructor(private readonly panelUc: PanelUC) {}

  @Post('activity/create')
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async createActivity(
    @Body() body: CreateActivityDto,
  ): Promise<CreatedRecordResponseDto> {
    const rowId = await this.panelUc.createActivity(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Actividad creada exitosamente',
      data: rowId,
    };
  }

  @Patch('activity/update')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async updateActivity(
    @Body() body: updateActivity,
  ): Promise<UpdateRecordResponseDto> {
    await this.panelUc.updateActivity(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Actividad actualizada exitosamente',
    };
  }

  @Delete('activity/delete/:id')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async deleteActivity(
    @Param('id') id: string,
  ): Promise<DeleteReCordResponseDto> {
    await this.panelUc.deleteActivity(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Actividad eliminada exitosamente',
    };
  }

  @Get('activities')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async getActivities() {
    const activities = await this.panelUc.getActivities();
    return {
      statusCode: HttpStatus.OK,
      data: activities,
    };
  }

  @Patch('configuration')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async updateConfiguration(
    @Body() body: updateConfiguration,
  ): Promise<UpdateRecordResponseDto> {
    await this.panelUc.updateConfiguration(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Configuración actualizada exitosamente',
    };
  }

  @Get('configuration')
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  async getConfiguration() {
    const configuration = await this.panelUc.getConfiguration();
    return {
      statusCode: HttpStatus.OK,
      data: configuration,
    };
  }
}
