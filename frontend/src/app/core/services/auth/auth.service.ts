import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserModel } from '../../../shared/models/user';
import { addLocalStorageItem } from '../../../shared';


const AUTH_API = '/workplace/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: UserModel;

  constructor(protected http: HttpClient,
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
      .get(`${AUTH_API}profile/`)
      .pipe(
        map(user => plainToClass(UserModel, user)),
        tap(currentUser => this.currentUser = currentUser)
      );
  }

  private redirectToUserPage() {
    if (this.currentUser) {
      this.router.navigate(['app', 'profile']).then();
    }
  }
}
