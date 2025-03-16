import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import { LoginDto, RefreshTokenBodyDto } from '../dtos/auth.dto';

@Injectable()
export class AuthUC {
  constructor(private readonly authService: AuthService) {}

  async login(user: LoginDto) {
    return this.authService.signIn(user);
  }

  async refreshToken(body: RefreshTokenBodyDto) {
    return this.authService.refreshToken(body);
  }
}
