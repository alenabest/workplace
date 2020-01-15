import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { join } from 'path';

import { FileUploadModel, OkTrueModel } from '../../common/models';
import { UpdateUserDto, UserDto, UserFilterDto } from '../dto';
import { ExternalUserModel, UserModel } from '../models';
import { User } from '../db';

@Injectable()

export class UserService {

  constructor(@InjectRepository(User)
              private readonly userRepository: Repository<User>) {
  }

  getUsers(query: UserFilterDto): Observable<ExternalUserModel[]> {
    return from(this.userRepository.find({ where: query }));
  }

  getUser(userId?: string, query?: UserFilterDto): Observable<UserModel> {
    return from(this.userRepository.findOne(userId, { where: query }));
  }

  createUser(user: UserDto): Observable<UserDto> {
    return from(this.userRepository.save<UserDto>(user));
  }

  updateUser(userId: string, user: UpdateUserDto): Observable<ExternalUserModel> {
    return from(this.userRepository.update(userId, user))
      .pipe(
        switchMap(() => from(this.userRepository.findOne(userId))),
        map(result => plainToClass(ExternalUserModel, result))
      );
  }

  deleteUser(id: string): string {
    return `Удаляем пользователя ${id}`;
  }

  uploadAvatar(file: FileUploadModel, userId: string): Observable<{url: string}> {
    const avatarUrl: string = join('media', 'avatars', userId, file.originalname);
    return from(this.userRepository.update(userId, {avatar: avatarUrl}))
      .pipe(
        map(() => Object({ url: avatarUrl}))
      );
  }

  changePassword(userId: string, changesPassword: {password: string}): Observable<OkTrueModel> {
    console.log(userId, changesPassword);
    return from(this.userRepository.update(userId, changesPassword))
      .pipe(
        map(() => new OkTrueModel())
      );
  }
}
