import {
  CreateActivityDto,
  CreateEventDto,
  PaginatedListEventsParamsDto,
  updateActivity,
  updateEvent,
} from './../../dtos/activity.dto';
import { Roles } from './../../../shared/decorators/roles.decorator';
import { RolesGuard } from './../../../shared/guards/roles.guard';
import {
  updateAbout,
  updateGeneralInfo,
  updateHome,
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
  Query,
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
  async getActivities() {
    const activities = await this.panelUc.getActivities();
    return {
      statusCode: HttpStatus.OK,
      data: activities,
    };
  }

  @Get('home')
  @ApiOkResponse()
  async getHome() {
    const home = await this.panelUc.getHome();
    return {
      statusCode: HttpStatus.OK,
      data: home,
    };
  }

  @Patch('home/update')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async updateHome(@Body() body: updateHome): Promise<UpdateRecordResponseDto> {
    await this.panelUc.updateConfiguration(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Información actualizada exitosamente',
    };
  }

  @Get('about')
  @ApiOkResponse()
  async getAbout() {
    const about = await this.panelUc.getAbout();
    return {
      statusCode: HttpStatus.OK,
      data: about,
    };
  }

  @Patch('about/update')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async updateAbout(
    @Body() body: updateAbout,
  ): Promise<UpdateRecordResponseDto> {
    await this.panelUc.updateConfiguration(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Información actualizada exitosamente',
    };
  }

  @Get('general-info')
  @ApiOkResponse()
  async getGeneralInfo() {
    const generalInfo = await this.panelUc.getGeneralInfo();
    return {
      statusCode: HttpStatus.OK,
      data: generalInfo,
    };
  }

  @Patch('general-info/update')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async updateGeneralInfo(
    @Body() body: updateGeneralInfo,
  ): Promise<UpdateRecordResponseDto> {
    await this.panelUc.updateConfiguration(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Información actualizada exitosamente',
    };
  }

  @Get('events')
  @ApiOkResponse()
  async getEvents() {
    const events = await this.panelUc.getEvents();
    return {
      statusCode: HttpStatus.OK,
      data: events,
    };
  }

  @Post('event/create')
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async createEvent(
    @Body() body: CreateEventDto,
  ): Promise<CreatedRecordResponseDto> {
    const rowId = await this.panelUc.createEvent(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Evento creado exitosamente',
      data: rowId,
    };
  }

  @Patch('event/update')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async updateEvent(
    @Body() body: updateEvent,
  ): Promise<UpdateRecordResponseDto> {
    await this.panelUc.updateEvent(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Evento actualizado exitosamente',
    };
  }

  @Delete('event/delete/:id')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  async deleteEvent(@Param('id') id: string): Promise<DeleteReCordResponseDto> {
    await this.panelUc.deleteEvent(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Evento eliminado exitosamente',
    };
  }

  @Get('events/paginated-list')
  @ApiOkResponse()
  async eventsPaginatedList(@Query() query: PaginatedListEventsParamsDto) {
    return await this.panelUc.eventsPaginatedList(query);
  }

  @Get('event/:id')
  @ApiOkResponse()
  async getEvent(@Param('id') id: string) {
    return await this.panelUc.getEvent(id);
  }
}
