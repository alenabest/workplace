import { HttpException, HttpStatus } from '@nestjs/common';


export class WrongPasswordException extends HttpException {
  constructor() {
    super('Неверный пароль', HttpStatus.BAD_REQUEST);
  }
}

export class UserNotExistException extends HttpException {
  constructor() {
    super('Невозможно войти с предоставленными учетными данными', HttpStatus.BAD_REQUEST);
  }
}
