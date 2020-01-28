import { Transform } from 'class-transformer';

import { formatDateToClass, formatDateToPlain, formatMedia } from '../../../core/helpers';



export class UserModel {
  id?: number;
  username?: string;
  password?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  phone?: string;

  @Transform(formatMedia(), { toClassOnly: true })
  avatar?: string;

  @Transform(formatDateToPlain(), { toPlainOnly: true })
  @Transform(formatDateToClass(), { toClassOnly: true })
  birthday?: Date | string;
}

export class UserPasswordModel {
  newPassword: string;
  oldPassword: string;
}
