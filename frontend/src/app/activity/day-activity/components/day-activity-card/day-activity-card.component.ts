import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DayActivityClass } from '../day-activity-page/day-activity-page.component';
import { format } from 'date-fns';


@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss']
})
export class DayActivityCardComponent implements OnChanges {
  @Input() dayActivity: DayActivityClass[];

  hourArray: string[];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dayActivity && changes.dayActivity.currentValue && changes.dayActivity.currentValue !== changes.dayActivity.previousValue) {
      this.hourArray = this.getTimeArray();
    }
  }

  getTimeArray(): string[] {
    const hourArray: string[] = [];
    const startHour: number = this.dayActivity[0].startHour;
    const endHour: number = this.dayActivity[this.dayActivity.length - 1].endHour + 2;
    for (let hour = startHour; hour < endHour; hour++) {
      hourArray.push(format(new Date(1, 1, 1, hour, 0), 'HH:mm'));
    }
    return hourArray;
  }
}
