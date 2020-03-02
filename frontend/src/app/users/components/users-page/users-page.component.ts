import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/services/auth';
import { UserService } from '../../../core/services/user';
import { UserModel } from '../../../common/models/user';
import { map, share } from 'rxjs/operators';


@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  inputFlex = '160px';
  isAdmin: boolean = false;

  users$: Observable<UserModel[]>;

  constructor(private readonly authService: AuthService,
              private readonly userService: UserService) {
    this.isAdmin = this.authService.currentUser.role === 'admin';
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this._getUsers()
      .pipe(
        share()
      );
  }

  _getUsers(): Observable<UserModel[]> {
    return this.userService.getUsers()
      .pipe(
        map(response => response.results)
      );
  }
}
