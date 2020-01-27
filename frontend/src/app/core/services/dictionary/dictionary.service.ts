import { Injectable } from '@angular/core';
import { ClassType } from 'class-transformer/ClassTransformer';
import { HttpClient, HttpParams } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { generateQuery } from '../../../common/utils';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  constructor(protected http: HttpClient) { }

  getDictionary<T>(dictionaryApi: string, cls: ClassType<T>, params?: HttpParams): Observable<T[]> {
    params = generateQuery(params);

    return this.http
      .get<T[]>(`/workplace/${dictionaryApi}/`, { params })
      .pipe(
        map(results => plainToClass(cls, results))
      );
  }
}
