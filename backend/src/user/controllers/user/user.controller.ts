import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../../services/user.service';
import { ExternalUserModel } from '../../models';
import { UpdateUserDto, UserDto, UserFilterDto } from '../../dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiTags('user')
  @HttpCode(HttpStatus.OK)
  getUsers(@Query() query: UserFilterDto): Observable<ExternalUserModel[]> {
    return this.userService.getUsers(query)
      .pipe(
        map(users => plainToClass(ExternalUserModel, users))
      );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiTags('user')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string): Observable<ExternalUserModel> {
    return this.userService.getUser(id)
      .pipe(
        map(user => plainToClass(ExternalUserModel, user))
      );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiTags('user')
  @HttpCode(HttpStatus.OK)
  create(@Body() userDto: UserDto): Observable<UserDto> {
    return this.userService.createUser(userDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiTags('user')
  @HttpCode(HttpStatus.OK)
  update(@Param('id')id: string, @Body() updateUserDto: UpdateUserDto): Observable<ExternalUserModel> {
    return this.userService.updateUser(id, updateUserDto)
      .pipe(
        map(result => plainToClass(ExternalUserModel, result))
      );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiTags('user')
  @HttpCode(HttpStatus.OK)
  delete(@Param()id: string): string {
    return this.userService.deleteUser(id);
  }
}
