import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { UserDto } from '../../dto/user.dto';
import { UserListModel } from '../../models/user.model';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @ApiTags('user')
  getUsers(@Req() request: Request): Observable<UserDto[]> {
    return this.userService.getUsers(request);
  }

  @Get(':id')
  @ApiTags('user')
  getUser(@Param('id') id: string): Observable<UserListModel> {
    return this.userService.getUser(id)
      .pipe(
        map(user => plainToClass(UserListModel, user))
      );
  }

  @Post()
  @ApiTags('user')
  createUser(@Body() userDto: UserDto): Observable<UserDto> {
    return this.userService.createUser(userDto);
  }

  @Patch(':id')
  @ApiTags('user')
  updateUser(@Param()id: string, @Body() userDto: UserDto): UserDto {
    return this.userService.updateUser(userDto);
  }

  @Delete(':id')
  @ApiTags('user')
  deleteUser(@Param()id: string): string {
    return this.userService.deleteUser(id);
  }
}
