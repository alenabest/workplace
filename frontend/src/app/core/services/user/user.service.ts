import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IResponse, prepareObject, serializeResponse } from '../../helpers';
import { RoleModel, UserModel } from '../../../common/models/user';
import { UserParam } from '../../../common/models/params';
import { generateQuery } from '../../../common/utils';


const USER_API = '/workplace/api/user/';
const ROLE_API = '/workplace/api/role/';

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

  createUser(user: object): Observable<UserModel> {
    return this.http
      .post(`${USER_API}`, prepareObject(UserModel, user))
      .pipe(
        map(result => plainToClass(UserModel, result))
      );
  }

  updateUser(userId: number, user: UserModel): Observable<UserModel> {
    return this.http
      .patch(`${USER_API}${userId}/`, prepareObject(UserModel, user))
      .pipe(
        map(result => plainToClass(UserModel, result))
      );
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http
      .delete(`${USER_API}${userId}/`)
      .pipe(
        map(() => true)
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

  getRoles(): Observable<IResponse<RoleModel>> {
    return this.http
      .get<IResponse<RoleModel>>(`${ROLE_API}` )
      .pipe(
        map(response => serializeResponse(RoleModel, response))
      );
  }
}
