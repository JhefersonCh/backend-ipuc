import { User } from './../../../shared/entities/user.entity';
import { UserModel } from './../../models/user.model';
import { UserRepository } from './../../../shared/repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: UserModel): Promise<{ rowId: string }> {
    const userExist = await this.findByParams({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    this.validatePasswordMatch(user.password, user.confirmPassword);
    if (userExist) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }
    const res = await this.userRepository.insert({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    });
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

  async findByParams(params: Record<string, any>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [params],
    });
    return user;
  }

  async register(user: UserModel): Promise<{ rowId: string }> {
    const salt = await bcrypt.genSalt();
    const userExist = await this.userRepository.findOne({
      where: [
        { id: user.id },
        { email: user.email },
        { username: user.username },
      ],
    });

    this.validatePasswordMatch(user.password, user.confirmPassword);

    const userConfirm = {
      ...user,
      password: await bcrypt.hash(user.password, salt),
      role: 'user',
    };

    if (userExist) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }

    const res = await this.userRepository.insert(userConfirm);
    return { rowId: res.identifiers[0].id };
  }

  private validatePasswordMatch(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      throw new HttpException(
        'Las contraseñas no coinciden',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async initData(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
