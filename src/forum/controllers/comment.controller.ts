import {
  GetCommentByIdResponseDto,
  GetPostCommentsResponseDto,
} from './../dto/comment.dto';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  NotFoundResponseDto,
  UpdateRecordResponseDto,
} from './../../shared/dtos/response.dto';
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
import { CommentDto, UpdateCommentDto } from '../dto/comment.dto';

import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentUseCase } from '../useCases/comment.uc';

@Controller('comment')
@ApiTags('Comentarios')
export class CommentController {
  constructor(private readonly commentUC: CommentUseCase) {}

  @Get(':postId')
  @ApiOkResponse({ type: GetPostCommentsResponseDto })
  async findByPost(
    @Param('postId') postId: string,
  ): Promise<GetPostCommentsResponseDto> {
    const data = await this.commentUC.findByPost(postId);
    return {
      data,
      statusCode: HttpStatus.OK,
    };
  }

  @Post()
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async create(
    @Body() commentDto: CommentDto,
    @Req() req,
  ): Promise<CreatedRecordResponseDto> {
    const rowId = await this.commentUC.create({
      ...commentDto,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Comentario creado correctamente',
      data: rowId,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: GetCommentByIdResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<GetCommentByIdResponseDto> {
    const data = await this.commentUC.findOne(id);
    return {
      data,
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req,
  ): Promise<UpdateRecordResponseDto> {
    await this.commentUC.update({
      id,
      ...updateCommentDto,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Comentario actualizado correctamente',
    };
  }

  @Delete(':id')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async remove(
    @Param('id') id: string,
    @Req() req,
  ): Promise<DeleteReCordResponseDto> {
    await this.commentUC.delete(id, req.user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Comentario eliminado correctamente',
    };
  }
}
