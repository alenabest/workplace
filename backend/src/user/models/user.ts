import { Exclude } from 'class-transformer';


export class UserModel {
  id: number;
  username: string;
  password: string;
}


export class UserListModel extends UserModel {
  @Exclude()
  password: string;
}
