import {
  Body,
  Controller,
  Delete,
  Param,
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
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  UnauthorizedResponseDto,
} from '../dtos/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UploadFileDto } from '../dtos/files.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { B2Service } from '../services/b2.service';

@Controller('files')
@ApiTags('Archivos')
export class FilesController {
  constructor(private readonly b2Service: B2Service) {}

  @Post()
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    const result = await this.b2Service.uploadImage(
      file,
      body.fileName,
      body.folder,
    );
    return { url: result['secure_url'], publicId: result['public_id'] };
  }

  @Delete('/:publicId')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteFile(@Param('publicId') publicId: string) {
    await this.b2Service.deleteImage(publicId);
    return { message: 'File deleted successfully' };
  }
}
