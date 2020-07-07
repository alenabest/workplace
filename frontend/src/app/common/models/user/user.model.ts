import {Exclude} from 'class-transformer';

export class UserPasswordModel {
  newPassword: string;
  oldPassword: string;
  @Exclude()
  repeatPassword: string;
}
