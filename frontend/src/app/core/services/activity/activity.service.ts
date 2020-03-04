import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ActivityModel, ActivityValidation, MonthActivityModel, WeekActivityModel } from '../../../common/models/activity';
import { DayActivityParam, MonthActivityParam, WeekActivityParam } from '../../../common/models/params';
import { IResponse, prepareObject, serializeResponse } from '../../helpers';
import { generateQuery } from '../../../common/utils';


const ACTIVITY_API = '/workplace/activity/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(protected http: HttpClient) {
  }

  getDayActivity(query: DayActivityParam): Observable<IResponse<ActivityModel>> {
    const params = generateQuery(query);

    return this.http
      .get<IResponse<ActivityModel>>(`${ACTIVITY_API}`, { params })
      .pipe(
        map(results => serializeResponse(ActivityModel, results))
      );
  }

  getWeekActivity(params: WeekActivityParam): Observable<IResponse<WeekActivityModel>> {
    return this.http
      .post<IResponse<WeekActivityModel>>(`${ACTIVITY_API}week/`, params)
      .pipe(
        map(results => serializeResponse(WeekActivityModel, results))
      );
  }

  getMonthActivity(params: MonthActivityParam): Observable<IResponse<MonthActivityModel>> {
    return this.http
      .post<IResponse<MonthActivityModel>>(`${ACTIVITY_API}month/`, params)
      .pipe(
        map(results => serializeResponse(MonthActivityModel, results))
      );
  }

  createActivity(activity: object): Observable<ActivityModel> {
    return this.http
      .post(`${ACTIVITY_API}`, prepareObject(ActivityModel, activity))
      .pipe(
        map(result => plainToClass(ActivityModel, result))
      );
  }

  updateActivity(activityId: number, activity: ActivityModel): Observable<ActivityModel> {
    return this.http
      .patch(`${ACTIVITY_API}${activityId}/`, prepareObject(ActivityModel, activity))
      .pipe(
        map(result => plainToClass(ActivityModel, result))
      );
  }
  validateActivity(activityValidation: ActivityValidation): Observable<ActivityValidation> {
    return this.http
      .post(`${ACTIVITY_API}validate/`, prepareObject(ActivityValidation, activityValidation))
      .pipe(
        map(result => plainToClass(ActivityValidation, result))
      );
  }

  deleteActivity(activityId: number): Observable<boolean> {
    return this.http.delete(`${ACTIVITY_API}${activityId}/`)
      .pipe(
        map(() => true)
      );
  }
}
