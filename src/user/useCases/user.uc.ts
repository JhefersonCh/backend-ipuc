import { UserDto } from '../dtos/user.dto';
import { UserService } from './../services/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserUC {
  constructor(private readonly userService: UserService) {}

  async create(user: UserDto) {
    return await this.userService.create(user);
  }

  async findAll() {
    return await this.userService.findAll();
  }

  async findOne(id: string) {
    return await this.userService.findOne(id);
  }
}
