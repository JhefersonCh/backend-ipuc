import { User } from './../../shared/entities/user.entity';
import { ResponsePaginationDto } from './../../shared/dtos/pagination.dto';
import { PageMetaDto } from './../../shared/dtos/pageMeta.dto';
import { UserRepository } from './../../shared/repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginatedListUsersParamsDto } from '../dtos/user.dto';
import { ILike, Not } from 'typeorm';
import { UserModel } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async paginatedList(
    params: PaginatedListUsersParamsDto,
  ): Promise<ResponsePaginationDto<User>> {
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

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findByParams(params: Partial<User>) {
    const user = await this.userRepository.findOne({ where: params });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, body: UserModel) {
    await this.findByParams({ id });
    if (body.email) {
      const userEmailExist = await this.userRepository.findOne({
        where: { id: Not(id), email: body.email },
      });
      if (userEmailExist) {
        throw new HttpException(
          'El correo electrónico ya está registrado.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (body.username) {
      const userUsernameExist = await this.userRepository.findOne({
        where: { id: Not(id), username: body.username },
      });
      if (userUsernameExist) {
        throw new HttpException(
          'El nombre de usuario ya está registrado.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return this.userRepository.update(id, body);
  }

  async create(body: UserModel): Promise<{ rowId: string }> {
    const userEmailExist = await this.userRepository.findOne({
      where: { email: body.email },
    });
    const userUsernameExist = await this.userRepository.findOne({
      where: { username: body.username },
    });
    if (userEmailExist) {
      throw new HttpException(
        'El correo electrónico ya está registrado.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (userUsernameExist) {
      throw new HttpException(
        'El nombre de usuario ya está registrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    body.password = await bcrypt.hash(body.password, 10);
    return { rowId: (await this.userRepository.save(body)).id };
  }

  async delete(id: string) {
    await this.findByParams({ id });
    return this.userRepository.delete(id);
  }
}
