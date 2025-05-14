import { PasswordService } from './password.service';
import {
  NOT_FOUND_MESSAGE,
  PASSWORDS_NOT_MATCH,
} from './../../../shared/constants/messages.constant';
import { ChangePasswordDto } from './../../dtos/profile.dto';
import { User } from './../../../shared/entities/user.entity';
import { UserModel } from './../../models/user.model';
import { UserRepository } from './../../../shared/repositories/user.repository';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly _passwordService: PasswordService,
  ) {}

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

  async update(id: string, userData: Partial<UserModel>) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Validar si se está cambiando el email o username
    if (userData.email && userData.email !== user.email) {
      const emailExists = await this.userRepository.findOne({
        where: { email: userData.email },
      });
      if (emailExists) {
        throw new BadRequestException(
          'El email ya está en uso por otro usuario',
        );
      }
    }

    if (userData.username && userData.username !== user.username) {
      const usernameExists = await this.userRepository.findOne({
        where: { username: userData.username },
      });
      if (usernameExists) {
        throw new BadRequestException(
          'El username ya está en uso por otro usuario',
        );
      }
    }

    Object.assign(user, userData);
    return await this.userRepository.update(user?.id || id, userData);
  }

  async changePassword(body: ChangePasswordDto, id: string) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }

    if (body.newPassword !== body.confirmNewPassword) {
      throw new HttpException(PASSWORDS_NOT_MATCH, HttpStatus.CONFLICT);
    }
    const passwordMatch = await this._passwordService.compare(
      body.oldPassword,
      user.password,
    );

    if (!passwordMatch) {
      throw new HttpException(
        'Contraseña incorrecta.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.userRepository.update(
      { id: id },
      { password: await this._passwordService.generateHash(body.newPassword) },
    );
  }

  async delete(id: string) {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }
}
