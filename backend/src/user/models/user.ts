import { Exclude } from 'class-transformer';


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
  birthday: string;
}


export class ExternalUserModel extends UserModel {
  @Exclude()
  password: string;
}
