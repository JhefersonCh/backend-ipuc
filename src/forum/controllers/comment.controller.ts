import { GetCommentByIdResponseDto } from './../dto/comment.dto';
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
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentUseCase } from '../useCases/comment.uc';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentUC: CommentUseCase) {}

  @Post()
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async create(
    @Body() commentDto: CommentDto,
    @Req() req,
  ): Promise<CreatedRecordResponseDto> {
    const data = await this.commentUC.create({
      ...commentDto,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Comentario creado correctamente',
      data: { rowId: data.id },
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: GetCommentByIdResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async findOne(@Param('id') id: string): Promise<GetCommentByIdResponseDto> {
    const data = await this.commentUC.get(id);
    return {
      data,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('comment/:postId')
  @ApiOkResponse({ type: [CommentDto] })
  @ApiParam({ name: 'postId', required: true, description: 'ID del post' })
  async findByPost(@Param('postId') postId: string): Promise<CommentDto[]> {
    return await this.commentUC.getPost(postId);
  }

  @Get('parent/:parentId')
  @ApiOkResponse({ type: [CommentDto] })
  @ApiParam({
    name: 'parentId',
    required: true,
    description: 'ID del comentario padre',
  })
  async findReplies(
    @Param('parentId') parentId: string,
  ): Promise<CommentDto[]> {
    return await this.commentUC.getRepliesByComment(parentId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiParam({ name: 'id', required: true, description: 'ID del comentario' })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<UpdateRecordResponseDto> {
    await this.commentUC.update(id, updateCommentDto);
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
  @ApiParam({ name: 'id', required: true, description: 'ID del comentario' })
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
