import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { ExternalUserModel, UserModel } from '../../../user/models';
import { PasswordDTO, UserDto } from '../../../user/dto';
import { AuthModel } from '../../models';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              private readonly userService: UserService) {
  }

  @Post('login')
  @ApiTags('auth')
  login(@Body() userDto: UserDto): Observable<AuthModel> {
    return this.authService.validateUser(userDto.username, userDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiTags('auth')
  profile(@Request() request): Observable<UserModel> {

    return request.user
      .pipe(
        switchMap((user: {id: string}) => this.userService.getUser(user.id)),
        map(user => plainToClass(ExternalUserModel, user))
      );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('change-password')
  @ApiTags('auth')
  changePassword(@Request() request, @Body() passwordDTO: PasswordDTO): Observable<UserModel> {

    return request.user
      .pipe(
        switchMap((user: {id: string}) => this.authService.getUserAndUpdatePassword(user.id, passwordDTO)),
      );
  }
}
