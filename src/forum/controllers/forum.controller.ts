import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  DuplicatedResponseDto,
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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreatePostDto,
  GetAllPostsDto,
  PaginatedListPostsParamsDto,
  UpdatePostDto,
} from '../dto/post.dto';
import { PostUseCase } from '../useCases/post.uc';
import { AuthGuard } from '@nestjs/passport';

@Controller('forum')
@ApiTags('Foro')
export class ForumController {
  constructor(private readonly postUseCase: PostUseCase) {}

  @Get('post/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  async getPost(@Param('id') id: string, @Query() query: GetAllPostsDto) {
    const post = await this.postUseCase.findById(id, query?.userId);
    return {
      statusCode: HttpStatus.OK,
      data: post,
    };
  }

  @Post('post')
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiConflictResponse({ type: DuplicatedResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async createPost(@Body() createPostDto: CreatePostDto, @Req() req) {
    const data = await this.postUseCase.create({
      ...createPostDto,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Post creado correctamente',
      data,
    };
  }

  @Patch('post/:id')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req,
  ): Promise<UpdateRecordResponseDto> {
    await this.postUseCase.update({
      ...updatePostDto,
      id,
      userId: req.user.id,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Post actualizado correctamente',
    };
  }

  @Delete('post/:id')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deletePost(
    @Param('id') id: string,
    @Req() req,
  ): Promise<DeleteReCordResponseDto> {
    await this.postUseCase.delete(id, req.user.id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Post eliminado correctamente',
    };
  }

  @Get('posts')
  @ApiOkResponse()
  async getAllPosts(@Query() query: GetAllPostsDto) {
    const posts = await this.postUseCase.findAll(query?.userId);
    return {
      statusCode: HttpStatus.OK,
      data: posts,
    };
  }

  @Get('posts/paginated-list')
  @ApiOkResponse()
  async getPaginatedPosts(@Query() query: PaginatedListPostsParamsDto) {
    const posts = await this.postUseCase.paginatedList(query);
    return {
      statusCode: HttpStatus.OK,
      data: posts,
    };
  }
}
