import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, share, switchMap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { ConfirmationDialogComponent } from '../../../common/dialogs/confirmation-dialog/component';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import { SnackBarService } from '../../../core/services/snack-bar';
import { UserService } from '../../../core/services/user';
import { UserModel } from '../../../common/models/user';
import { LoginService } from '../../../login';


@UntilDestroy()
@Component({
  selector: 'users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  inputFlex = '160px';
  isAdmin: boolean = false;

  search: string = '';

  users$: Observable<UserModel[]>;

  constructor(private readonly snackBarService: SnackBarService,
              private readonly loginService: LoginService,
              private readonly userService: UserService,
              private dialog: MatDialog) {
    this.isAdmin = this.loginService.currentUser.role === 'admin';
  }

  ngOnDestroy(): void {
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
        switchMap(result => this.checkUserDialogResult(result)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeAction(message));
  }

  checkUserDialogResult(result: UserModel): Observable<UserModel> {
    if (result) {
      return this.createOrUpdateUser(result);
    }

    return of();
  }

  openDeleteDialog(user: UserModel) {
    const message = `Удалить пользователя ${user.lastName} ${user.firstName} / ${user.username}?`;
    this.dialog.open(ConfirmationDialogComponent, {data: message, disableClose: true})
      .afterClosed()
      .pipe(
        switchMap(result => this.checkDeletedDialogResult(result, user.id)),
        untilDestroyed(this)
      )
      .subscribe(() => this.completeAction('Пользователь удалён'));
  }

  checkDeletedDialogResult(result: boolean, userId: number): Observable<boolean> {
    if (result) {
      return this.userService.deleteUser(userId);
    }

    return of();
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
