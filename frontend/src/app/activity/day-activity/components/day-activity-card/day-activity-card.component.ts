import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ActivityModel } from '../../../../common/models/activity';
import { BackgroundColors, HourArray } from '../../../data';
import { getRandomElement } from '../../../../common/utils';


@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss']
})
export class DayActivityCardComponent implements OnChanges {
  @Input() activities: ActivityModel[];

  hourArray = HourArray;

  get calculateScrollTop(): number {
    if (!this.activities || this.activities.length === 0) {
      return 0;
    }

    return this.activities[0].startHour * 60;
  }

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dayActivity && changes.dayActivity.currentValue && changes.dayActivity.currentValue !== changes.dayActivity.previousValue) {
      this.activities.map((item, index) => this.prepareStyle(item, index));
    }
  }

  prepareStyle(item: ActivityModel, index: number): ActivityModel {
    item.backgroundColor = getRandomElement<string>(BackgroundColors);
    return this.calculateMargin(item, index);
  }

  calculateMargin(item: ActivityModel, index: number): ActivityModel {
    if (index === this.activities.length - 1) {
      item.marginBottom = 0;
      return item;
    }
    const nextItem = this.activities[index + 1];
    const hours = nextItem.startHour - item.endHour;
    const minutes = nextItem.startMinute - item.endMinute;

    if (index === 0) {
      item.marginTop = item.startHour * 60 + item.startMinute + 'px';
    }

    item.marginBottom = hours * 60 + minutes + 'px';

    return item;
  }
}
