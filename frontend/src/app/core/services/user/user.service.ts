import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserParam } from '../../../common/models/params';
import { UserModel } from '../../../common/models/user';
import { generateQuery } from '../../../common/utils';
import { IResponse, prepareObject, serializeResponse } from '../../helpers';


const USER_API = '/workplace/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) {
  }

  getUsers(query?: UserParam): Observable<IResponse<UserModel>> {
    const params = generateQuery(query);

    return this.http
      .get<IResponse<UserModel>>(`${USER_API}`, { params })
      .pipe(
        map(response => serializeResponse(UserModel, response))
      );
  }

  updateUser(userId: number, user: UserModel): Observable<UserModel> {
    return this.http
      .patch(`${USER_API}${userId}/`, prepareObject(UserModel, user))
      .pipe(
        map(result => plainToClass(UserModel, result))
      );
  }

  uploadAvatar(blob: File | Blob, userId: number): Observable<UserModel> {
    const formData: FormData = new FormData();
    formData.append('file', blob);

    return this.http
      .post<{ url: string }>(`${USER_API}${userId}/upload-avatar/`, formData)
      .pipe(
        map(result => plainToClass(UserModel, result))
      );
  }
}
