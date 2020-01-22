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

  scrollTop: number = 0;

  hourArray = HourArray;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities && changes.activities.currentValue && changes.activities.currentValue !== changes.activities.previousValue) {
      this.activities.map((item, index) => this.prepareStyle(item, index));
      this.scrollTop = this.calculateScrollTop();
    }
  }

  addActivity(hour: string) {
    console.log(hour);
  }

  calculateScrollTop(): number {
    if (!this.activities || this.activities.length === 0) {
      return 0;
    }

    return this.activities[0].startHour * 60;
  }

  prepareStyle(item: ActivityModel, index: number): ActivityModel {
    item.backgroundColor = getRandomElement<string>(BackgroundColors);
    return this.calculateMargin(item, index);
  }

  calculateMargin(item: ActivityModel, index: number): ActivityModel {
    item.marginBottom = this.calculateMarginBottom(item, index);

    if (index === 0) {
      item.marginTop = item.startHour * 60 + item.startMinute + 'px';
    }

    return item;
  }

  calculateMarginBottom(item: ActivityModel, index: number): string | number {
    if (this.activities.length === 1) {
      return 0;
    }

    const nextItem = this.activities[index + 1];
    const hours = nextItem.startHour - item.endHour;
    const minutes = nextItem.startMinute - item.endMinute;

    return hours * 60 + minutes + 'px';
  }
}
