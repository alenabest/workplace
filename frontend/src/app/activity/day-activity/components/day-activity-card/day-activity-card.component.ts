import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ViewActivityDialogComponent } from '../../../dialogs/view-activity-dialog';
import { ActivityDialogComponent } from '../../../dialogs/activity-dialog';
import { BaseActivity } from '../../../../common/models/base-activity';
import { ActivityModel } from '../../../../common/models/activity';
import { SubjectService } from '../../../../core/services/subject';
import { HourArray } from '../../../data';


@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss']
})
export class DayActivityCardComponent extends BaseActivity implements OnChanges {
  @Input() activities: ActivityModel[];

  scrollTop: number = 0;

  hourArray = HourArray;

  constructor(private dialog: MatDialog,
              private readonly subjectService: SubjectService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities && changes.activities.currentValue && changes.activities.currentValue !== changes.activities.previousValue) {
      this.activities.map((item, index) => this.prepareStyle(this.activities, item, index));
      this.scrollTop = this.calculateScrollTop();
    }
  }

  openViewDialog(activity: ActivityModel) {
    this.dialog.open(ViewActivityDialogComponent, {data: activity})
      .afterClosed()
      .pipe(
        switchMap(result => {
          if (result) {
            return this.openUpdateActivityDialog(activity);
          }
          return of();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result: Date) => this.reloadActivityPage(result));
  }

  reloadActivityPage(date: Date) {
    if (date) {
      this.subjectService.getActivitySubject.next(date);
    }
  }

  openUpdateActivityDialog(activity: ActivityModel): Observable<any | undefined> {
    return this.dialog.open(ActivityDialogComponent, {disableClose: true, data: activity})
      .afterClosed();
  }

  addActivity(hour: string) {
    console.log(hour);
  }

  calculateScrollTop(): number {
    if (!this.activities || this.activities.length === 0) {
      return 0;
    }

    return this.activities[0].startHour * 60;
  }
}
