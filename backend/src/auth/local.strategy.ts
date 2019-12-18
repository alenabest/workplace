import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './services/auth/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(username: string, password: string): Observable<any> {
    return this.authService.validateUser(username, password)
      .pipe(
        map(user => this.checkUser(user))
      );
  }

  checkUser(user): Observable<any> {
    if (!user) {
      throw new UnauthorizedException();
    }

    return from(user);
  }
}
