import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../../../user/services/user.service';
import { UserNotExistException } from '../../../core/exceptions';
import { UserModel } from '../../../user/models';
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
}
