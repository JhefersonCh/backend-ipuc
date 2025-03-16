import { CreateOrUpdateUserDto } from '../dtos/user.dto';
import { BaseUserDto } from '../dtos/user.dto';
import { UserService } from './../services/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserUC {
  constructor(private readonly userService: UserService) {}

  async create(user: CreateOrUpdateUserDto) {
    return await this.userService.create(user);
  }

  async register(user: BaseUserDto) {
    return await this.userService.register(user);
  }

  async findAll() {
    return await this.userService.findAll();
  }

  async findOne(id: string) {
    return await this.userService.findOne(id);
  }
}
