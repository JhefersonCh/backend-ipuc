import { StatisticsResponseDto } from './../../dtos/profile.dto';
import { ProfileUseCase } from './../../useCases/profile.UC';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';

@Controller('profile')
@ApiTags('Perfil')
export class ProfileController {
  constructor(private readonly profileUseCase: ProfileUseCase) {}

  @Get('/statistics')
  @ApiOkResponse({
    description: 'Retorna las estatísticas do ususario',
    type: StatisticsResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getStatistics(@Req() req): Promise<StatisticsResponseDto> {
    const data = await this.profileUseCase.getStatistics(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
