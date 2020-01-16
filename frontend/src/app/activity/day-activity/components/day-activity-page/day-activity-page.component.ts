import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { ru as locale } from 'date-fns/locale';
import { format, add } from 'date-fns';
import { Exclude, Expose, plainToClass } from 'class-transformer';


export class DayActivityClass {
  start: string;
  end: string;
  description: string;
  marginBottom: string | number;
  marginTop: string | number;

  @Exclude({ toPlainOnly: true })
  @Expose()
  get height() {
    const startArray: number[] = this.start.split(':').map(item => Number(item));
    const endArray: number[] = this.end.split(':').map(item => Number(item));
    const hours = endArray[0] - startArray[0];
    const minutes = endArray[1] - startArray[1];
    return hours * 60 + minutes + 'px';
  }

  @Exclude({ toPlainOnly: true })
  @Expose()
  get startHour() {
    const startHour = this.start.split(':')[0];
    return Number(startHour);
  }

  @Exclude({ toPlainOnly: true })
  @Expose()
  get endHour() {
    const endHour = this.end.split(':')[0];
    return Number(endHour);
  }
}

const dayActivity = [
  {
    start: '08:30',
    end: '09:10',
    description: 'Я делала то-то и то-то'
  },
  {
    start: '14:50',
    end: '16:10',
    description: 'Я делала что-то'
  }
];

@Component({
  selector: 'day-activity-page',
  templateUrl: './day-activity-page.component.html',
  styleUrls: ['./day-activity-page.component.scss']
})
export class DayActivityPageComponent implements OnInit {
  currentDate: Date = new Date();
  dateFormat: string = 'dd MMMM yyyy, cccc';
  dayActivity: DayActivityClass[];

  get currentDayLabel(): string {
    return format(this.currentDate, this.dateFormat, { locale });
  }

  constructor() {
    this.dayActivity = plainToClass(DayActivityClass, dayActivity);
    this.dayActivity.map((item, index) => {

      if (index === this.dayActivity.length - 1) {
        item.marginBottom = 0;
        return item;
      }
      const startArray: number[] = item.end.split(':').map(start => Number(start));
      const endArray: number[] = this.dayActivity[index + 1].start.split(':').map(end => Number(end));
      const hours = endArray[0] - startArray[0];
      const minutes = endArray[1] - startArray[1];

      if (index === 0) {
        item.marginTop = item.start.split(':')[1] + 'px';
      }

      item.marginBottom = hours * 60 + minutes + 'px';

      return item;
    });
  }

  ngOnInit() {
  }

  changeDay(event: MatDatepickerInputEvent<any>) {
    this.currentDate = event.value;
  }

  getLastDate() {
    this.currentDate = add(this.currentDate, { days: -1 });
  }

  getNextDate() {
    this.currentDate = add(this.currentDate, { days: 1 });
  }
}
