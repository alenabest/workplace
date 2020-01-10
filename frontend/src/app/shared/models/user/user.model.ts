import { Transform, Type } from 'class-transformer';

import { formatDateToClass, formatDateToPlain, serializeType } from '../../../core/helpers';



export class UserModel {
  id: number;
  username: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobile: string;
  phone: string;

  @Type(serializeType(Date))
  @Transform(formatDateToPlain(), { toPlainOnly: true })
  @Transform(formatDateToClass(), { toClassOnly: true })
  birthday: Date | string;
}
