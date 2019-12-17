import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { User } from '../db/user.entity';
import { UserDto } from '../dto/user.dto';


@Injectable()

export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  getUsers(request: Request): Observable<UserDto[]> {
    return from(this.userRepository.find());
  }

  getUser(id: string): Observable<UserDto> {
    return from(this.userRepository.findOne(id));
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
