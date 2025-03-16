import { LoginDto, RefreshTokenBodyDto } from './../../dtos/auth.dto';
import { AuthUC } from '../../useCases/auth.UC';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUC: AuthUC) {}

  @Post('login')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  async login(@Body() user: LoginDto) {
    return await this.authUC.login(user);
  }

  @Post('refresh-token')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  async refreshToken(@Body() body: RefreshTokenBodyDto) {
    return await this.authUC.refreshToken(body);
  }
}
