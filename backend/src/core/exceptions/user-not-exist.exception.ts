import { HttpException, HttpStatus } from '@nestjs/common';


export class UserNotExistException extends HttpException {
  constructor() {
    super('Невозможно войти с предоставленными учетными данными', HttpStatus.BAD_REQUEST);
  }
}
