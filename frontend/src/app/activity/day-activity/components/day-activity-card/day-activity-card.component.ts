import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BackgroundColors, HourArray } from '../../../data';
import { DayActivityClass } from '../../../../common/models/activity';
import { getRandomElement } from '../../../../common/utils';


@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss']
})
export class DayActivityCardComponent implements OnChanges {
  @Input() dayActivity: DayActivityClass[];

  hourArray = HourArray;

  get calculateScrollTop(): number {
    if (!this.dayActivity || this.dayActivity.length === 0) {
      return 0;
    }

    return this.dayActivity[0].startHour * 60;
  }

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dayActivity && changes.dayActivity.currentValue && changes.dayActivity.currentValue !== changes.dayActivity.previousValue) {
      this.dayActivity.map((item, index) => this.prepareStyle(item, index));
    }
  }

  prepareStyle(item: DayActivityClass, index: number): DayActivityClass {
    item.backgroundColor = getRandomElement<string>(BackgroundColors);
    return this.calculateMargin(item, index);
  }

  calculateMargin(item: DayActivityClass, index: number): DayActivityClass {
    if (index === this.dayActivity.length - 1) {
      item.marginBottom = 0;
      return item;
    }
    const nextItem = this.dayActivity[index + 1];
    const hours = nextItem.startHour - item.endHour;
    const minutes = nextItem.startMinute - item.endMinute;

    if (index === 0) {
      item.marginTop = item.startHour * 60 + item.startMinute + 'px';
    }

    item.marginBottom = hours * 60 + minutes + 'px';

    return item;
  }
}
