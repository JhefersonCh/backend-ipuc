import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
  CreateUserDto,
  PaginatedListUsersParamsDto,
  UpdateUserDto,
} from '../dtos/user.dto';

@Injectable()
export class UserUC {
  constructor(private readonly userService: UserService) {}

  async paginatedList(query: PaginatedListUsersParamsDto) {
    return await this.userService.paginatedList(query);
  }

  async getUser(id: string) {
    return await this.userService.findById(id);
  }

  async updateUser(id: string, body: UpdateUserDto) {
    return await this.userService.update(id, body);
  }

  async createUser(body: CreateUserDto) {
    return await this.userService.create(body);
  }

  async deleteUser(id: string) {
    return await this.userService.delete(id);
  }
}
