import { User } from './../../../shared/entities/user.entity';
import { UserModel } from './../../models/user.model';
import { UserRepository } from './../../../shared/repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: UserModel): Promise<{ rowId: string }> {
    const userExist = await this.findOne(user.id);
    if (userExist) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }
    const res = await this.userRepository.insert(user);
    return { rowId: res.identifiers[0].id };
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
