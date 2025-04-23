import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { SharedModule } from './shared/shared.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ForumModule } from './forum/forum.module';
import { AdminModule } from './admin/admin.module';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SharedModule.forRoot(),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    UserModule,
    ForumModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
