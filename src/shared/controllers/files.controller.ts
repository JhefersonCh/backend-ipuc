import {
  Body,
  Controller,
  HttpStatus,
  Post,
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
  DeleteReCordResponseDto,
  UnauthorizedResponseDto,
} from '../dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  CreatedFileResponseDto,
  DeleteFileDto,
  UploadFileDto,
} from '../dtos/files.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { B2Service } from '../services/b2.service';

@Controller('files')
@ApiTags('Archivos')
export class FilesController {
  constructor(private readonly b2Service: B2Service) {}

  @Post()
  @ApiOkResponse({ type: CreatedFileResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ): Promise<CreatedFileResponseDto> {
    const result = await this.b2Service.uploadImage(
      file,
      body.fileName,
      body.folder,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Archivo subido exitosamente',
      data: { url: result['secure_url'], publicId: result['public_id'] },
    };
  }

  @Post('/delete')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteFile(
    @Body() body: DeleteFileDto,
  ): Promise<DeleteReCordResponseDto> {
    await this.b2Service.deleteImage(body.publicId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Archivo eliminado exitosamente',
    };
  }
}
