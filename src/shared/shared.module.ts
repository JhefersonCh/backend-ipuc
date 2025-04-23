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
          }),
        }),
        PassportModule,
        TypeOrmModule.forFeature([User, Post, Like, Comment]),
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
      ],
      providers: [
        UserRepository,
        JwtStrategy,
        AuthService,
        UserService,
        B2Service,
      ],
      exports: [],
    };
  }
}
