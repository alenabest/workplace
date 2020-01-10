import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { ExternalUserModel, UserModel } from '../models';
import { UpdateUserDto, UserDto, UserFilterDto } from '../dto';
import { User } from '../db';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';


@Injectable()

export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {
  }

  getUsers(query: UserFilterDto): Observable<ExternalUserModel[]> {
    return from(this.userRepository.find({ where: query }));
  }

  getUser(id?: string, query?: UserFilterDto): Observable<UserModel> {
    return from(this.userRepository.findOne(id, { where: query }));
  }

  createUser(user: UserDto): Observable<UserDto> {
    return from(this.userRepository.save<UserDto>(user));
  }

  updateUser(id: string, user: UpdateUserDto): Observable<ExternalUserModel> {
    return from(this.userRepository.update(id, user))
      .pipe(
        map(result => plainToClass(ExternalUserModel, result))
      );
  }

  deleteUser(id: string): string {
    return `Удаляем пользователя ${id}`;
  }
}
