import {
  LoginDto,
  RefreshTokenBodyDto,
  SignOutBodyDto,
} from './../../dtos/auth.dto';
import { AuthUC } from '../../useCases/auth.UC';
import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('sign-out')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: UnauthorizedException })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async signOut(@Body() body: SignOutBodyDto) {
    return await this.authUC.signOut(body);
  }
}
