import { ResponsePaginationDto } from './../../shared/dtos/pagination.dto';
import { PageMetaDto } from './../../shared/dtos/pageMeta.dto';
import { UserRepository } from './../../shared/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { PaginatedListUsersParamsDto } from '../dtos/user.dto';
import { ILike } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async paginatedList(params: PaginatedListUsersParamsDto) {
    const skip = (params.page - 1) * params.perPage;
    const where = {};

    params.email && Object.assign(where, { email: ILike(`%${params.email}%`) });
    params.firstName &&
      Object.assign(where, { firstName: ILike(`%${params.firstName}%`) });
    params.lastName &&
      Object.assign(where, { lastName: ILike(`%${params.lastName}%`) });
    params.username &&
      Object.assign(where, { username: ILike(`%${params.username}%`) });
    params.role && Object.assign(where, { role: params.role });

    let finalWhere = where;

    if (params.search) {
      finalWhere = [
        { ...where, firstName: ILike(`%${params.search}%`) },
        { ...where, lastName: ILike(`%${params.search}%`) },
        { ...where, username: ILike(`%${params.search}%`) },
        { ...where, email: ILike(`%${params.search}%`) },
      ];
    }

    const [entities, itemCount] = await this.userRepository.findAndCount({
      where: finalWhere,
      skip,
      take: params.perPage,
      order: { createdAt: params.order },
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new ResponsePaginationDto(entities, pageMetaDto);
  }
}
