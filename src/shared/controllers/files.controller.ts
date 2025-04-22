import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreatedRecordResponseDto,
  UnauthorizedResponseDto,
} from '../dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UploadFileDto } from '../dtos/files.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';
import { join } from 'path';
import * as fs from 'fs';

@Controller('files')
@ApiTags('Archivos')
export class FilesController {
  constructor() {}

  @Post()
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('file', multerConfig()))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
    @Req() req,
  ) {
    if (file && (req as any).fileFields) {
      const tempPath = join('./uploads/temp', (req as any).fileFields.tempName);

      const finalPath = (req as any).fileFields.destinationPath(body);

      const finalName = body.fileName
        ? `${body.fileName}${(req as any).fileFields.ext}`
        : `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${(req as any).fileFields.ext}`;

      const finalFilePath = join(finalPath, finalName);

      if (body.fileName && fs.existsSync(finalFilePath)) {
        fs.unlinkSync(finalFilePath);
      }

      if (fs.existsSync(tempPath)) {
        if (!fs.existsSync(finalPath)) {
          fs.mkdirSync(finalPath, { recursive: true });
        }

        fs.renameSync(tempPath, finalFilePath);
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Archivo subido correctamente',
    };
  }
}
