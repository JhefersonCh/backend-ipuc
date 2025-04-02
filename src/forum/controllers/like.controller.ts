import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikeUseCase } from '../useCases/like.uc';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LikeDto } from '../dto/like.dto';

@Controller('like')
@ApiTags('Me gusta')
export class LikeController {
  constructor(private readonly likeUseCase: LikeUseCase) {}

  @Post()
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async like(@Body() body: LikeDto, @Req() req) {
    return await this.likeUseCase.create(body, req.user.id);
  }

  @Delete(':postId')
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async delete(@Param('postId') postId: string, @Req() req) {
    return await this.likeUseCase.delete(postId, req.user.id);
  }
}
