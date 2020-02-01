import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { WeekLabelModel, WeekListModel } from '../../../../common/models/dictionary';
import { MonthActivityModel } from '../../../../common/models/activity';
import { isOnChange } from '../../../../common/utils';
import { WeekArray } from '../../../data';


@Component({
  selector: 'month-activity-card',
  templateUrl: './month-activity-card.component.html',
  styleUrls: ['./month-activity-card.component.scss']
})
export class MonthActivityCardComponent implements OnChanges {
  @Input() monthActivities: MonthActivityModel[];
  @Input() weekList: WeekListModel[];

  weekLabels: WeekLabelModel[] = WeekArray;
  dayFormat = 'dd';
  weekRowLength: string = '0';

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChange(changes.weekList)) {
      this.weekRowLength = (100 / this.weekList.length) + '%';
    }
  }

  addActivity(day: Date) {
    console.log(day);
  }
}
