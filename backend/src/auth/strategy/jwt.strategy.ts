import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Observable, of } from 'rxjs';

import { jwtConstants } from '../constants';


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  validate(payload: { sub: number, username: string }): Observable<{id: number}> {
    return of({id: payload.sub});
  }
}
