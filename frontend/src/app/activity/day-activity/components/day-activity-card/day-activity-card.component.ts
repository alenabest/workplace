import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ActivityService } from '../../../../core/services/activity';
import { ActivityModel } from '../../../../common/models/activity';
import { SubjectService } from '../../../../core/services/subject';
import { BaseDayActivity } from '../../../../common/models/base';
import { HourArray } from '../../../data';


@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayActivityCardComponent extends BaseDayActivity implements OnChanges {
  @Input() activities: ActivityModel[];
  @Input() currentDate: Date;

  scrollTop: number = 0;

  hourArray = HourArray;

  constructor(public readonly activityService: ActivityService,
              public readonly subjectService: SubjectService,
              public dialog: MatDialog) {
    super(activityService, subjectService, dialog);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities && changes.activities.currentValue && changes.activities.currentValue !== changes.activities.previousValue) {
      this.activities.map((item, index) => this.prepareStyle(this.activities, item, index));
      this.scrollTop = this.calculateScrollTop();
    }
  }

  checkTime(day: Date, hour: string) {
    const existActivity = this.activities.find(item => item.endHour === parseInt(hour.split(':')[0], 10));
    if (existActivity) {
      hour = existActivity.end;
    }
    this.addActivity(day, hour);
  }

  calculateScrollTop(): number {
    if (!this.activities || this.activities.length === 0) {
      return 0;
    }

    return this.activities[0].startHour * 60;
  }
}
