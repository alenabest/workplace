import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth/auth.controller';
import { UserService } from '../user/services/user.service';
import { AuthService } from './services/auth/auth.service';
import { LocalStrategy } from './local.strategy';
import { User } from '../user/db';
import { Auth } from './db';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';


@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Auth, User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy]
})
export class AuthModule {
}
