import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActivityModel, WeekActivityModel } from '../../../../common/models/activity';
import { WeekLabelModel } from '../../../../common/models/dictionary';
import { ActivityService } from '../../../../core/services/activity';
import { SubjectService } from '../../../../core/services/subject';
import { isOnChange } from '../../../../common/utils';
import { TimeModel } from '../../../data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'week-activity-card',
  templateUrl: './week-activity-card.component.html',
  styleUrls: ['./week-activity-card.component.scss']
})
export class WeekActivityCardComponent implements OnChanges, OnDestroy {
  @Input() weekActivities: WeekActivityModel[];
  @Input() weekDayArray: WeekLabelModel[];
  @Input() timeArray: TimeModel[];

  weekFormat = 'dd.MM.yy';
  weekFormatMobile = 'dd';
  scrollTop: number = 0;

  constructor(public dialog: MatDialog,
              public readonly subjectService: SubjectService,
              public readonly activityService: ActivityService) {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChange(changes.weekActivities)) {
      this.weekActivities.forEach(item =>
        item.activities.map((activity, index) => this.activityService.prepareStyle(item.activities, activity, index)));
      this.scrollTop = this.calculateScrollTop();
    }
  }

  checkTime(day: Date, hour: string, idx: number) {
    const existActivities = this.activityService.findExistActivity(this.weekActivities[idx].activities, hour);
    if (existActivities.length > 0) {
      hour = this.activityService.getLastEndTime(existActivities);
    }
    this.addActivity(day, hour);
  }

  addActivity(day: Date, hour?: string): void {
    const newActivity = new ActivityModel(day, hour);
    this.activityService.openUpdateActivityDialog(newActivity)
      .pipe(untilDestroyed(this))
      .subscribe((result) => this.activityService.reloadActivityPage(result));
  }

  openViewDialog(activity: ActivityModel): void {
    this.activityService.openViewDialog(activity)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  calculateScrollTop(): number {
    const firstActivity = this.getFirstActivity();
    if (firstActivity) {
      return firstActivity.startHour * 60;
    }

    return 0;
  }

  getFirstActivity() {
    let firstActivity = null;
    this.weekActivities.forEach(item => {
      item.activities.forEach(activity => {
        if (!firstActivity || activity.start < firstActivity.start) {
          firstActivity = activity;
        }
      });
    });

    return firstActivity;
  }
}
