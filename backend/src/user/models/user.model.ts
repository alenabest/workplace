import { Exclude } from 'class-transformer';


export class UserListModel {
  id: number;
  username: string;

  @Exclude()
  password: string;
}
