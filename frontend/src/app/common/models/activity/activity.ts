import { Exclude, Expose } from 'class-transformer';


export class DayActivityClass {
  start: string;
  end: string;
  description: string;
  marginBottom: string | number;
  marginTop: string | number;
  backgroundColor: string;

  @Exclude({ toPlainOnly: true })
  @Expose()
  get height(): string {
    const hours = this.endHour - this.startHour;
    const minutes = this.endMinute - this.startMinute;
    return hours * 60 + minutes + 'px';
  }

  @Exclude({ toPlainOnly: true })
  @Expose()
  get startHour(): number {
    const startHour = this.start.split(':')[0];
    return parseInt(startHour, 10);
  }

  @Exclude({ toPlainOnly: true })
  @Expose()
  get startMinute(): number {
    const startMinute = this.start.split(':')[1];
    return parseInt(startMinute, 10);
  }

  @Exclude({ toPlainOnly: true })
  @Expose()
  get endHour(): number {
    const endHour = this.end.split(':')[0];
    return parseInt(endHour, 10);
  }

  @Exclude({ toPlainOnly: true })
  @Expose()
  get endMinute(): number {
    const endMinute = this.end.split(':')[1];
    return parseInt(endMinute, 10);
  }
}
