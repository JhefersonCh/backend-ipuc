import { RefreshTokenBodyDto, SignOutBodyDto } from './../../dtos/auth.dto';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TokenPayloadModel,
  UserAuthModel,
} from '../../models/authentication.model';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../../../user/services/user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/shared/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async signIn(credentials: Partial<UserAuthModel>) {
    const user = await this.usersService.findByParams({
      username: credentials.username,
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatch = await bcrypt.compare(
      credentials.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = { username: user.username, sub: user.id, id: user.id };
    const tokens = this.generateTokens(payload);
    return {
      tokens: { ...tokens },
      user: { id: user.id, role: user.role },
    };
  }

  async validateSession({ userId, token }: { userId: string; token: string }) {
    const user = await this.usersService.findOne(userId);
    let payload;
    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('jwt.secret'),
      });
    } catch (_e) {
      throw new UnauthorizedException('No autorizado');
    }
    if (!user) {
      throw new UnauthorizedException('No autorizado');
    }

    return user;
  }

  generateTokens(payload: TokenPayloadModel): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.expiresIn'),
      secret: this.configService.get<string>('jwt.secret'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'),
      secret: this.configService.get<string>('jwt.secret'),
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(body: RefreshTokenBodyDto) {
    let paiload;

    try {
      paiload = this.jwtService.verify(body.refreshToken, {
        secret: this.configService.get<string>('jwt.secret'),
      });
    } catch (_e) {
      throw new UnauthorizedException('No autorizado');
    }

    const user = await this.validateSession({
      userId: paiload.sub,
      token: body.refreshToken,
    });

    if (!user) {
      throw new UnauthorizedException('No autorizado');
    }
    const tokens = this.generateTokens({
      username: user.username,
      id: user.id,
      sub: user.id,
    });

    return {
      tokens: { ...tokens },
      user: {
        id: user.id,
        role: user.role,
      },
    };
  }

  async signOut(body: SignOutBodyDto) {
    return;
  }
}
