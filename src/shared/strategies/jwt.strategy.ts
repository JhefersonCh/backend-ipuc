import { TokenPayloadModel } from './../../auth/models/authentication.model';

import { AuthService } from './../../auth/services/auth/auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
      passReqToCallback: true,
    });
  }

  async validate(payload: TokenPayloadModel, req: Request) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const user = await this.authService.validateSession({
      userId: payload.sub,
      token,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
