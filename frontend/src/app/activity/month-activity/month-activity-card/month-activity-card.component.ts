import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ActivityModel, MonthActivityModel } from '../../../server-api';
import { WeekLabelModel, WeekListModel } from '../../week-activity';
import { ActivityService } from '../../activity.service';
import { isOnChange } from '../../../common/utils';
import { WeekArray } from '../../activity-data';


@UntilDestroy()
@Component({
  selector: 'month-activity-card',
  templateUrl: './month-activity-card.component.html',
  styleUrls: ['./month-activity-card.component.scss']
})
export class MonthActivityCardComponent implements OnChanges, OnDestroy {
  @Input() monthActivities: MonthActivityModel[];
  @Input() weekList: WeekListModel[];

  weekLabels: WeekLabelModel[] = WeekArray;
  weekRowLength: string = '0';
  dayFormat = 'dd';

  constructor(public readonly activityService: ActivityService) {
  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChange(changes.weekList)) {
      this.weekRowLength = (100 / this.weekList.length) + '%';
    }
  }

  addActivity(day: Date): void {
    const newActivity = new ActivityModel(day);
    this.activityService.openUpdateActivityDialog(newActivity)
      .pipe(untilDestroyed(this))
      .subscribe((result) => this.activityService.reloadActivityPage(result));
  }

  openViewDialog(activity: ActivityModel): void {
    this.activityService.openViewDialog(activity)
      .pipe(untilDestroyed(this))
      .subscribe();
  }
}
