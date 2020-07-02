import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { WeekLabelModel, WeekListModel } from '../../../../common/models/dictionary';
import { ActivityModel, MonthActivityModel } from '../../../../common/models/activity';
import { ActivityService } from '../../../../core/services/activity';
import { SubjectService } from '../../../../core/services/subject';
import { isOnChange } from '../../../../common/utils';
import { WeekArray } from '../../../data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';


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
  dayFormat = 'dd';
  weekRowLength: string = '0';

  constructor(public dialog: MatDialog,
              public readonly subjectService: SubjectService,
              public readonly activityService: ActivityService) {
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
