import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ActivityDayParam, ActivityModel } from '../../../common/models/activity';
import { generateQuery } from '../../../common/utils';
import { Observable } from 'rxjs';
import { IResponse, serializeResponse } from '../../helpers';


const ACTIVITY_API = '/workplace/activity/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(protected http: HttpClient) { }

  getDayActivity(params: ActivityDayParam | HttpParams): Observable<IResponse<ActivityModel>> {
    params = generateQuery(params);

    return this.http
      .get<IResponse<ActivityModel>>(`${ACTIVITY_API}/day/`, { params })
      .pipe(
        map(results => serializeResponse(ActivityModel, results))
      );
  }
}
