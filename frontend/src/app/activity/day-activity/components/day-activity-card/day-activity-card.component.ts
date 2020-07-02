import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';

import { ActivityService } from '../../../../core/services/activity';
import { ActivityModel } from '../../../../common/models/activity';
import { SubjectService } from '../../../../core/services/subject';
import { TimeModel } from '../../../data';


@UntilDestroy()
@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayActivityCardComponent implements OnChanges, OnDestroy {
  @Input() activities: ActivityModel[];
  @Input() currentDate: Date;
  @Input() timeArray: TimeModel[];

  scrollTop: number = 0;

  constructor(public readonly activityService: ActivityService,
              public readonly subjectService: SubjectService,
              public dialog: MatDialog) {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities && changes.activities.currentValue && changes.activities.currentValue !== changes.activities.previousValue) {
      this.activities.map((item, index) => this.activityService.prepareStyle(this.activities, item, index));
      this.scrollTop = this.calculateScrollTop();
    }
  }

  checkTime(day: Date, hour: string): void {
    const existActivities = this.activityService.findExistActivity(this.activities, hour);
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
    if (!this.activities || this.activities.length === 0) {
      return 0;
    }

    return this.activities[0].startHour * 60;
  }
}
