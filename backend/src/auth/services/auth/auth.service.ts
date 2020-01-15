import { Injectable } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { UserNotExistException, WrongPasswordException } from '../../../core/exceptions';
import { ChangesPasswordModel, UserModel } from '../../../user/models';
import { UserService } from '../../../user/services/user.service';
import { OkTrueModel } from '../../../common/models';
import { AuthModel } from '../../models';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
              private readonly jwtService: JwtService) {
  }

  validateUser(username: string, password: string): Observable<AuthModel> {
    return this.userService.getUser(null, {username: username})
      .pipe(
        map(user => this.checkPassword(user, password))
      );
  }

  checkPassword(user: UserModel, password: string): AuthModel {
    if (user && user.password === password) {
      return this.getToken(user);
    }

    throw new UserNotExistException();
  }

  getToken(user: UserModel): AuthModel {
    const userData = {username: user.username, sub: user.id};
    return {token: this.jwtService.sign(userData)};
  }

  getUserAndUpdatePassword(userId: string, changesPassword: ChangesPasswordModel): Observable<OkTrueModel> {
    return this.userService.getUser(userId)
      .pipe(
        map(user => this.compareAndGetPassword(user, changesPassword)),
        switchMap((result: {password: string}) => this.userService.changePassword(userId, result))
      );
  }

  compareAndGetPassword(user: UserModel, changesPassword: ChangesPasswordModel): {password: string} {
    if (user && user.password === changesPassword.oldPassword) {
      return {password: changesPassword.newPassword};
    }

    throw new WrongPasswordException();
  }
}
