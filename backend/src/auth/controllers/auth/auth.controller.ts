import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { UserDto } from '../../../user/dto';
import { AuthModel } from '../../models';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  @ApiTags('auth')
  login(@Body() userDto: UserDto): Observable<AuthModel> {
    return this.authService.validateUser(userDto.username, userDto.password);
  }
}
