import { Component, Input, OnInit } from '@angular/core';

import { WeekLabelModel, WeekListModel } from '../../../../common/models/dictionary';
import { WeekArray } from '../../../data';

@Component({
  selector: 'month-activity-card',
  templateUrl: './month-activity-card.component.html',
  styleUrls: ['./month-activity-card.component.scss']
})
export class MonthActivityCardComponent implements OnInit {
  @Input() weekList: WeekListModel[];
  weekLabels: WeekLabelModel[] = WeekArray;
  constructor() { }

  ngOnInit() {
  }

}
