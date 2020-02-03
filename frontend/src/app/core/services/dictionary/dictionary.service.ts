import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DictionaryParamModel } from '../../../common/models/params';
import { IResponse, serializeResponse } from '../../helpers';
import { generateQuery } from '../../../common/utils';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(protected http: HttpClient) { }

  getDictionary<T>(dictionaryApi: string, cls: ClassType<T>, params?: DictionaryParamModel | HttpParams): Observable<IResponse<T>> {
    params = generateQuery(params);

    return this.http
      .get<IResponse<T>>(`/workplace/${dictionaryApi}/`, { params })
      .pipe(
        map(results => serializeResponse(cls, results))
      );
  }

  createDictionary<T>(dictionaryApi: string, dictionary: T): Observable<T> {
    return this.http
      .post<T>(`/workplace/${dictionaryApi}/`, dictionary);
  }

  updateDictionary<T>(dictionaryApi: string, dictionaryId: number, dictionary: T): Observable<T> {
    return this.http
      .patch<T>(`/workplace/${dictionaryApi}/${dictionaryId}/`, dictionary);
  }
}
