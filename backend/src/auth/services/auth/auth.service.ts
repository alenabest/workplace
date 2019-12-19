import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../../../user/services/user.service';
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

    throw new BadRequestException('Невозможно войти с предоставленными учетными данными');
  }

  getToken(user: UserModel): AuthModel {
    const userData = {username: user.username, sub: user.id};
    return {token: this.jwtService.sign(userData)};
  }
}
