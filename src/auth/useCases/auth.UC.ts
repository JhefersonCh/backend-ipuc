import { RecoveryPasswordBodyDto } from './../dtos/auth.dto';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';
import {
  LoginDto,
  RefreshTokenBodyDto,
  SignOutBodyDto,
} from '../dtos/auth.dto';

@Injectable()
export class AuthUC {
  constructor(private readonly authService: AuthService) {}

  async login(user: LoginDto) {
    return this.authService.signIn(user);
  }

  async refreshToken(body: RefreshTokenBodyDto) {
    return this.authService.refreshToken(body);
  }

  async signOut(body: SignOutBodyDto) {
    return this.authService.signOut(body);
  }

  async recoveryPassword(body: RecoveryPasswordBodyDto) {
    return await this.authService.recoveryPassword(body);
  }
}
