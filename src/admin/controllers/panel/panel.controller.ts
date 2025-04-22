import { UploadFileDto } from './../../../shared/dtos/files.dto';
import { multerConfig } from './../../../shared/config/multer.config';
import { AuthGuard } from '@nestjs/passport';
import {
  UnauthorizedResponseDto,
  UpdateRecordResponseDto,
} from './../../../shared/dtos/response.dto';
import { PanelUC } from './../../uc/panel.uc';

import {
  Controller,
  Get,
  HttpStatus,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('panel')
@ApiTags('Panel de Administrador')
export class PanelController {
  constructor(private readonly panelUc: PanelUC) {}

  @Get()
  async get() {
    return 'Funcionando';
  }

  @Post('home/hero-image')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('file', multerConfig('home', 'hero')))
  async updateHeroImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UpdateRecordResponseDto> {
    //await this.panelUc.updateHeroImage();
    return {
      statusCode: HttpStatus.OK,
      message: 'Imagen actualizada correctamente.',
    };
  }
}
