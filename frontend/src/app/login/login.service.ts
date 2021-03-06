import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserPasswordModel } from '../common/models/user';
import { OkTrueModel } from '../common/models/response';
import { addLocalStorageItem } from '../common/utils';
import {prepareObject} from '../core/helpers';
import { UserModel } from '../server-api';


const AUTH_API = '/workplace/api/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser: UserModel;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  logout() {
    this.currentUser = null;
    localStorage.clear();
    this.router.navigate(['login']).then();
  }

  login(user: UserModel): Observable<UserModel> {
    return this.http
      .post(`${AUTH_API}login/`, user)
      .pipe(
        tap((res: { token: string }) => addLocalStorageItem('authorization', res.token, true)),
        switchMap(() => this.getProfile()),
        finalize(() => this.redirectToUserPage())
      );
  }

  getProfile(): Observable<UserModel> {
    return this.http
      .get(`${AUTH_API}user/profile/`)
      .pipe(
        map(user => plainToClass(UserModel, user)),
        tap(currentUser => this.currentUser = currentUser)
      );
  }

  changePassword(changesPassword: UserPasswordModel): Observable<OkTrueModel> {
    return this.http
      .post<OkTrueModel>(`${AUTH_API}user/change-password/`, prepareObject(UserPasswordModel, changesPassword));
  }

  private redirectToUserPage() {
    if (this.currentUser) {
      this.router.navigate(['app', 'activity', 'day']).then();
    }
  }
}
