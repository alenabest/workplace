import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { WeekActivityModel } from '../../../../common/models/activity';
import { WeekLabelModel } from '../../../../common/models/dictionary';
import { ActivityService } from '../../../../core/services/activity';
import { SubjectService } from '../../../../core/services/subject';
import { BaseDayActivity } from '../../../../common/models/base';
import { HourArray, HourArrayMobile } from '../../../data';
import { isOnChange } from '../../../../common/utils';


@Component({
  selector: 'week-activity-card',
  templateUrl: './week-activity-card.component.html',
  styleUrls: ['./week-activity-card.component.scss']
})
export class WeekActivityCardComponent extends BaseDayActivity implements OnChanges {
  @Input() weekActivities: WeekActivityModel[];
  @Input() weekDayArray: WeekLabelModel[];

  weekFormat = 'dd.MM.yy';
  weekFormatMobile = 'dd';
  scrollTop: number = 0;
  hourArray = HourArray;
  hourArrayMobile = HourArrayMobile;

  constructor(public dialog: MatDialog,
              public readonly subjectService: SubjectService,
              public readonly activityService: ActivityService) {
    super(activityService, subjectService, dialog);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChange(changes.weekActivities)) {
      this.weekActivities.forEach(item => item.activities.map((activity, index) => this.prepareStyle(item.activities, activity, index)));
      this.scrollTop = this.calculateScrollTop();
    }
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
