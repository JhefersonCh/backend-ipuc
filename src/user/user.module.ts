import { UserRepository } from './../shared/repositories/user.repository';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { UserUC } from './useCases/user.uc';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserUC, UserService],
})
export class UserModule {}
