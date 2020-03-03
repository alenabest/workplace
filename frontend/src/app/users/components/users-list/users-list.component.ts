import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserModel } from '../../../common/models/user';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  @Input() users: UserModel[];
  @Input() isAdmin: boolean;

  @Output() editUserEvent = new EventEmitter<UserModel>();
  @Output() deleteUserEvent = new EventEmitter<UserModel>();

  noAvatarUrl = 'assets/images/no-image.png';

  editUser(user: UserModel) {
    this.editUserEvent.emit(user);
  }

  deleteUser(user: UserModel) {
    this.deleteUserEvent.emit(user);
  }
}
