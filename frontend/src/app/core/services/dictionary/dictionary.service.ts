import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DictionaryParam } from '../../../common/models/params';
import { IResponse, serializeResponse } from '../../helpers';
import { generateQuery } from '../../../common/utils';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(private http: HttpClient) { }

  getDictionary<T>(dictionaryApi: string, cls: ClassType<T>, query?: DictionaryParam): Observable<IResponse<T>> {
    const params = generateQuery(query);

    return this.http
      .get<IResponse<T>>(`/workplace/api/${dictionaryApi}/`, { params })
      .pipe(
        map(results => serializeResponse(cls, results))
      );
  }

  createDictionary<T>(dictionaryApi: string, dictionary: T): Observable<T> {
    return this.http
      .post<T>(`/workplace/api/${dictionaryApi}/`, dictionary);
  }

  updateDictionary<T>(dictionaryApi: string, dictionaryId: number, dictionary: T): Observable<T> {
    return this.http
      .patch<T>(`/workplace/api/${dictionaryApi}/${dictionaryId}/`, dictionary);
  }
}
