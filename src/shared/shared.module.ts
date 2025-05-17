import { MailsService } from './services/mails.service';
import { MailTemplateService } from './services/mail-template.service';
import { MailerGeneratorService } from './services/mailerGenerator.service';
import { PasswordService } from './../user/services/user/password.service';
import { PostRepository } from './repositories/post.respository';
import { LikeRepository } from './repositories/like.repository';
import { CommentRepository } from './repositories/comment.repository';
import { PostService } from './../forum/service/post.service';
import { LikeService } from './../forum/service/like.service';
import { CommentService } from './../forum/service/comment.service';
import { ProfileService } from './../user/services/user/profile.service';
import { UserService } from './../user/services/user/user.service';
import { AuthService } from './../auth/services/auth/auth.service';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity';
import { Like } from './entities/like.entity';
import { FilesController } from './controllers/files.controller';
import { B2Service } from './services/b2.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { Event } from './entities/event.entity';
import { Activity } from './entities/activity.entity';

@Module({})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      controllers: [FilesController],
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('db.host'),
            port: configService.get<number>('db.port'),
            username: configService.get('db.user'),
            password: configService.get('db.password'),
            database: configService.get('db.database'),
            entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            poolSize: 4,
            synchronize: false,
            extra: {
              max: 4,
              idleTimeoutMillis: 10000,
              idleInPoolTimeoutMillis: 10000,
              connectionTimeoutMillis: 2000,
            },
          }),
        }),
        PassportModule,
        TypeOrmModule.forFeature([User, Post, Like, Comment, Event]),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('jwt.secret'),
            signOptions: { expiresIn: configService.get('jwt.expiresIn') },
          }),
        }),
        PassportModule.register({
          defaultStrategy: 'jwt',
        }),
        MailerModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            transport: {
              host: configService.get<string>('mail.host'),
              port: configService.get<number>('mail.port'),
              secure: configService.get<boolean>('mail.secure'),
              auth: {
                user: configService.get<string>('mail.user'),
                pass: configService.get<string>('mail.password'),
              },
              sender: configService.get<string>('mail.sender'),
              to: configService.get<string>('mail.to'),
            },
          }),
        }),
      ],
      providers: [
        UserRepository,
        JwtStrategy,
        AuthService,
        UserService,
        B2Service,
        ProfileService,
        CommentService,
        PasswordService,
        MailerGeneratorService,
        MailTemplateService,
        MailsService,
        CommentRepository,
        LikeService,
        LikeRepository,
        PostService,
        PostRepository,
      ],
      exports: [],
    };
  }
}
