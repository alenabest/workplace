import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { map, share, switchMap, takeUntil } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ConfirmationDialogComponent } from '../../../common/dialogs/confirmation-dialog/component';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import { SnackBarService } from '../../../core/services/snack-bar';
import { BaseDestroy } from '../../../common/models/base-destroy';
import { AuthService } from '../../../core/services/auth';
import { UserService } from '../../../core/services/user';
import { UserModel } from '../../../common/models/user';


@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent extends BaseDestroy implements OnInit {
  inputFlex = '160px';
  isAdmin: boolean = false;

  search: string = '';

  users$: Observable<UserModel[]>;

  constructor(private readonly snackBarService: SnackBarService,
              private readonly authService: AuthService,
              private readonly userService: UserService,
              private dialog: MatDialog) {
    super();
    this.isAdmin = this.authService.currentUser.role === 'admin';
  }

  ngOnInit() {
    this.getUsers();
  }

  clearQuery() {
    this.search = '';
    this.getUsers();
  }

  completeAction(message: string) {
    this.snackBarService.success(message);
    this.getUsers();
  }

  createOrUpdateUser(user: UserModel): Observable<UserModel> {
    if (user.id) {
      return this.userService.updateUser(user.id, user);
    }
    return this.userService.createUser(user);
  }

  openUserDialog(user?: UserModel) {
    const message = user ? 'Пользователь изменён' : 'Пользователь добавлён';
    this.dialog.open(UserDialogComponent, {
      data: user ? user : new UserModel(),
      disableClose: true,
    })
      .afterClosed()
      .pipe(
        switchMap(result => {
          if (result) {
            return this.createOrUpdateUser(result);
          }

          return of();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.completeAction(message));
  }

  openDeleteDialog(user: UserModel) {
    const message = `Удалить пользователя ${user.lastName} ${user.firstName} / ${user.username}?`;
    this.dialog.open(ConfirmationDialogComponent, {data: message, disableClose: true})
      .afterClosed()
      .pipe(
        switchMap(result => {
          if (result) {
            return this.userService.deleteUser(user.id);
          }

          return of();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.completeAction('Пользователь удалён'));
  }

  getUsers() {
    this.users$ = this._getUsers()
      .pipe(
        share()
      );
  }

  _getUsers(): Observable<UserModel[]> {
    return this.userService.getUsers({search: this.search, ordering: 'last_name'})
      .pipe(
        map(response => response.results)
      );
  }
}
