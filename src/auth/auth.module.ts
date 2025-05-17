import { MailsService } from './../shared/services/mails.service';
import { MailTemplateService } from './../shared/services/mail-template.service';
import { PasswordService } from './../user/services/user/password.service';
import { UserRepository } from './../shared/repositories/user.repository';
import { UserService } from './../user/services/user/user.service';
import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { AuthUC } from './useCases/auth.UC';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SharedModule.forRoot(),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn') },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUC,
    JwtService,
    UserService,
    PasswordService,
    UserRepository,
    MailsService,
    MailTemplateService,
  ],
  exports: [],
})
export class AuthModule {}
