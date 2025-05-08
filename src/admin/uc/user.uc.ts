import { Injectable } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { PaginatedListUsersParamsDto } from '../dtos/user.dto';

@Injectable()
export class UserUC {
  constructor(private readonly userService: UserService) {}

  async paginatedList(query: PaginatedListUsersParamsDto) {
    return await this.userService.paginatedList(query);
  }
}
