import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';

import { ActivityDayParam, ActivityModel } from '../../../common/models/activity';
import { generateQuery } from '../../../common/utils';
import { Observable } from 'rxjs';


const ACTIVITY_API = '/workplace/activity/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(protected http: HttpClient) { }

  getDayActivity(params: ActivityDayParam | HttpParams): Observable<ActivityModel[]> {
    params = generateQuery(params);

    return this.http
      .get<ActivityModel[]>(`${ACTIVITY_API}/day/`, { params })
      .pipe(
        map(results => plainToClass(ActivityModel, results))
      );
  }
}
