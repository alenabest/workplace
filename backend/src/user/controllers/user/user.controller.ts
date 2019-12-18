import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { UserListModel } from '../../models';
import { UserDto, UserFilterDto } from '../../dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @ApiTags('user')
  getUsers(@Query() query: UserFilterDto): Observable<UserListModel[]> {
    return this.userService.getUsers(query)
      .pipe(
        map(users => plainToClass(UserListModel, users))
      );
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
