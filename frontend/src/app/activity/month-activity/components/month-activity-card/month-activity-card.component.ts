import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { WeekLabelModel, WeekListModel } from '../../../../common/models/dictionary';
import { MonthActivityModel } from '../../../../common/models/activity';
import { SubjectService } from '../../../../core/services/subject';
import { BaseActivity } from '../../../../common/models/base';
import { isOnChange } from '../../../../common/utils';
import { WeekArray } from '../../../data';


@Component({
  selector: 'month-activity-card',
  templateUrl: './month-activity-card.component.html',
  styleUrls: ['./month-activity-card.component.scss']
})
export class MonthActivityCardComponent extends BaseActivity implements OnChanges {
  @Input() monthActivities: MonthActivityModel[];
  @Input() weekList: WeekListModel[];

  weekLabels: WeekLabelModel[] = WeekArray;
  dayFormat = 'dd';
  weekRowLength: string = '0';

  constructor(public dialog: MatDialog,
              public readonly subjectService: SubjectService) {
    super(dialog, subjectService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChange(changes.weekList)) {
      this.weekRowLength = (100 / this.weekList.length) + '%';
    }
  }
}
