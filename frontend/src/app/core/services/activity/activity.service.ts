import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ActivityDayParam, ActivityModel, ActivityValidation } from '../../../common/models/activity';
import { IResponse, prepareObject, serializeResponse } from '../../helpers';
import { generateQuery } from '../../../common/utils';


const ACTIVITY_API = '/workplace/activity/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(protected http: HttpClient) {
  }

  getDayActivity(params: ActivityDayParam | HttpParams): Observable<IResponse<ActivityModel>> {
    params = generateQuery(params);

    return this.http
      .get<IResponse<ActivityModel>>(`${ACTIVITY_API}`, { params })
      .pipe(
        map(results => serializeResponse(ActivityModel, results))
      );
  }

  createActivity(activity: object): Observable<ActivityModel> {
    return this.http.post(`${ACTIVITY_API}`, prepareObject(ActivityModel, activity))
      .pipe(
        map(result => plainToClass(ActivityModel, result))
      );
  }

  updateActivity(activityId: number, activity: ActivityModel): Observable<ActivityModel> {
    return this.http.patch(`${ACTIVITY_API}${activityId}/`, prepareObject(ActivityModel, activity))
      .pipe(
        map(result => plainToClass(ActivityModel, result))
      );
  }

  validateActivity(activityValidation: ActivityValidation): Observable<ActivityValidation> {
    return this.http.post(`${ACTIVITY_API}validate/`, prepareObject(ActivityValidation, activityValidation))
      .pipe(
        map(result => plainToClass(ActivityValidation, result))
      );
  }
}
