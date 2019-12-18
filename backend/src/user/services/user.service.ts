import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { UserListModel, UserModel } from '../models';
import { UserDto, UserFilterDto } from '../dto';
import { User } from '../db';


@Injectable()

export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {
  }

  getUsers(query: UserFilterDto): Observable<UserListModel[]> {
    return from(this.userRepository.find({where: query}));
  }

  getUser(id?: string, query?: UserFilterDto): Observable<UserModel> {
    return from(this.userRepository.findOne(id, {where: query}));
  }

  createUser(user: UserDto): Observable<UserDto> {
    return from(this.userRepository.save<UserDto>(user));
  }

  updateUser(user: UserDto): UserDto {
    user.id = 11;
    return user;
  }

  deleteUser(id: string): string {
    return `Удаляем пользователя ${id}`;
  }
}
