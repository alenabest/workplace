import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserModel } from '../../../shared/models/user';
import { prepareObject } from '../../helpers';


const USER_API = '/workplace/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) {
  }

  updateUser(userId: number, user: UserModel): Observable<UserModel> {
    return this.http
      .patch(`${USER_API}${userId}/`, prepareObject(UserModel, user))
      .pipe(
        map(result => plainToClass(UserModel, result))
      );
  }

  uploadAvatar(blob: File, userId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', blob);

    return this.http
      .post(`${USER_API}${userId}/upload-avatar/`, formData);
  }
}
