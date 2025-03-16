import { UserRepository } from './../shared/repositories/user.repository';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { UserUC } from './useCases/user.uc';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [UserController],
  imports: [
    SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService, UserRepository, UserUC, UserService],
})
export class UserModule {}
