import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityModel, ActivityValidation } from '../../../common/models/activity';
import { prepareObject } from '../../../core/helpers';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { HttpClient } from '@angular/common/http';


const ACTIVITY_API = '/workplace/api/activity/';

@Injectable({
  providedIn: 'root'
})
export class ActivityDialogService {

  constructor(private http: HttpClient) {
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
}
