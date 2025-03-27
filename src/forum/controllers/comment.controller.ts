import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  NotFoundResponseDto,
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
import { CommentService } from '../service/comment.service';
import { CommentDto } from '../dto/comment.dto';
import { CommentModel } from '../models/commet.model';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentUseCase } from '../useCases/comment.uc';

@Controller('comment')
@Controller('Comentarios')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentUC: CommentUseCase,
  ) {}

  @Post()
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async create(
    @Body() commentDto: CommentDto,
    @Req() req,
  ): Promise<{ statusCode: number; message: string; data: CommentModel }> {
    const data = await this.commentUC.createComment({
      ...commentDto,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Comentario creado correctamente',
      data,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: CommentDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiParam({ name: 'id', required: true, description: 'ID del comentario' })
  async findOne(@Param('id') id: string): Promise<CommentDto> {
    return this.commentUC.getCommentById(id);
  }

  @Get('post/:postId')
  @ApiOkResponse({ type: CommentDto })
  @ApiParam({ name: 'postId', required: true, description: 'ID del post' })
  async findByPost(@Param('postId') postId: string): Promise<CommentModel[]> {
    return this.commentUC.getCommentsByPost(postId);
  }

  @Get('parent/:parentId')
  @ApiOkResponse({ type: CommentDto })
  @ApiParam({
    name: 'parentId',
    required: true,
    description: 'ID del comentario padre',
  })
  async findReplies(
    @Param('parentId') parentId: string,
  ): Promise<CommentModel[]> {
    return this.commentUC.getRepliesByComment(parentId);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiOkResponse({ type: CommentDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiParam({ name: 'id', required: true, description: 'ID del comentario' })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: CommentDto,
    @Req() req,
  ): Promise<CommentModel> {
    return this.commentUC.updateComment(id, {
      ...updateCommentDto,
      userId: req.user.id,
    });
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
  ): Promise<{ statusCode: number; message: string }> {
    await this.commentUC.deleteComment(id, req.user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Comentario eliminado correctamente',
    };
  }
}
