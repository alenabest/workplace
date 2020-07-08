import { Injectable } from '@angular/core';
import { add, endOfMonth, endOfWeek, getWeek, startOfMonth, startOfWeek } from 'date-fns';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { map, switchMap } from 'rxjs/operators';
import { ru as locale } from 'date-fns/locale';
import { Observable, of } from 'rxjs';

import { DayActivityParam, MonthActivityParam, WeekActivityParam } from '../common/models/params';
import { ConfirmationDialogComponent } from '../common/dialogs/confirmation-dialog/component';
import { ActivityModel, MonthActivityModel, WeekActivityModel } from '../server-api';
import { dateInDiapason, generateQuery, getRandomElement } from '../common/utils';
import { ViewActivityDialogComponent } from './view-activity-dialog';
import { WeekLabelModel, WeekListModel } from './week-activity';
import { IResponse, serializeResponse } from '../core/helpers';
import { BackgroundColors, WeekArray } from './activity-data';
import { ActivityDialogComponent } from './activity-dialog';
import { SubjectService } from '../core/services/subject';


const ACTIVITY_API = '/workplace/api/activity/';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient,
              private subjectService: SubjectService,
              private dialog: MatDialog) {
  }

  getDayActivity(query: DayActivityParam): Observable<IResponse<ActivityModel>> {
    const params: HttpParams = generateQuery(query);

    return this.http
      .get<IResponse<ActivityModel>>(`${ACTIVITY_API}`, {params})
      .pipe(
        map(results => serializeResponse(ActivityModel, results))
      );
  }

  getWeekActivity(query: WeekActivityParam): Observable<IResponse<WeekActivityModel>> {
    const params: HttpParams = generateQuery(query);

    return this.http
      .get<IResponse<WeekActivityModel>>(`${ACTIVITY_API}week/`, {params})
      .pipe(
        map(results => serializeResponse(WeekActivityModel, results))
      );
  }

  getMonthActivity(query: MonthActivityParam): Observable<IResponse<MonthActivityModel>> {
    return this.http
      .post<IResponse<MonthActivityModel>>(`${ACTIVITY_API}month/`, query)
      .pipe(
        map(results => serializeResponse(MonthActivityModel, results))
      );
  }

  deleteActivity(activityId: number): Observable<boolean> {
    return this.http.delete(`${ACTIVITY_API}${activityId}/`)
      .pipe(
        map(() => true)
      );
  }

  prepareStyle(activities: ActivityModel[], item: ActivityModel, index: number): ActivityModel {
    item.backgroundColor = getRandomElement<string>(BackgroundColors);
    return this.calculateMargin(activities, item, index);
  }

  calculateMargin(activities: ActivityModel[], item: ActivityModel, index: number): ActivityModel {
    item.marginBottom = this.calculateMarginBottom(activities, item, index);

    if (index === 0) {
      item.marginTop = item.startHour * 60 + item.startMinute + 'px';
    }

    return item;
  }

  calculateMarginBottom(activities: ActivityModel[], item: ActivityModel, index: number): string {
    if (activities.length === 1 || (activities.length - 1) === index) {
      return '0';
    }

    const nextItem = activities[index + 1];
    const hours = nextItem.startHour - item.endHour;
    const minutes = nextItem.startMinute - item.endMinute;

    return hours * 60 + minutes + 'px';
  }

  openViewDialog(activity: ActivityModel): Observable<ActivityModel | boolean> {
    return this.dialog.open(ViewActivityDialogComponent, {data: activity})
      .afterClosed()
      .pipe(
        switchMap((result: { open: boolean, delete: boolean }) => this.editOrDeleteActivity(result, activity))
      )
  }

  editOrDeleteActivity(result: { open: boolean, delete: boolean }, activity: ActivityModel): Observable<ActivityModel | boolean> {
    if (result.open) {
      return this.openUpdateActivityDialog(activity);
    }
    if (result.delete) {
      return this.openConfirmationDialog(activity.id);
    }
    return of();
  }

  reloadActivityPage(result) {
    if (result) {
      this.subjectService.getActivitySubject.next(result);
    }
  }

  openConfirmationDialog(activityId: number): Observable<boolean | undefined> {
    const message = 'Удалить активность?';
    return this.dialog.open(ConfirmationDialogComponent, {disableClose: true, data: message})
      .afterClosed()
      .pipe(switchMap(result => this.checkDeletedResult(result, activityId)));
  }

  checkDeletedResult(result: boolean, activityId: number): Observable<boolean> {
    if (result) {
      return this.deleteActivity(activityId);
    }
    return of();
  }

  findExistActivity(activities: ActivityModel[], hour: string): ActivityModel[] {
    return activities.filter(item => item.endHour === parseInt(hour.split(':')[0], 10));
  }

  openUpdateActivityDialog(activity: ActivityModel): Observable<ActivityModel> {
    return this.dialog.open(ActivityDialogComponent, {disableClose: true, data: activity})
      .afterClosed();
  }

  getLastEndTime(activities: ActivityModel[]): string {
    return activities[activities.length - 1].end;
  }

  getWeekList(start: Date, end: Date): WeekListModel[] {
    const weekList = [];
    let date = start;
    while (dateInDiapason(date, start, end)) {
      const weekLabel = getWeek(date, {locale});
      const week = weekList.find(item => item.label === weekLabel);
      if (week) {
        weekList.find(item => item.label === weekLabel).days.push(date);
      } else {
        weekList.push({label: weekLabel, days: [date]});
      }
      date = add(date, {days: 1});
    }

    return weekList;
  }

  getStartAndEndDate(currentDate: Date): Date[] {
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);

    return [startOfWeek(startMonth, {locale}), endOfWeek(endMonth, {locale})];
  }

  getMondaySunday(currentDate: Date): Date[] {
    const sunday = endOfWeek(currentDate, {locale});
    const monday = startOfWeek(currentDate, {locale});

    return [monday, sunday];
  }

  getWeekArray(monday: Date): WeekLabelModel[] {
    const weekArray = WeekArray;
    weekArray.map((item, index) => item.date = add(monday, {days: index}));

    return weekArray;
  }
}
