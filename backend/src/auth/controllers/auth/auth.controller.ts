import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../../../user/services/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserListModel, UserModel } from '../../../user/models';
import { UserDto } from '../../../user/dto';
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
    return this.userService.getUser(request.user.id)
      .pipe(
        map(user => plainToClass(UserListModel, user))
      );
  }
}
