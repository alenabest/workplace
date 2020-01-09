import { Transform, Type } from 'class-transformer';
import { Dayjs } from 'dayjs';

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

  @Type(serializeType(Dayjs))
  @Transform(formatDateToPlain(), { toPlainOnly: true })
  @Transform(formatDateToClass(), { toClassOnly: true })
  birthday: Dayjs;
}
