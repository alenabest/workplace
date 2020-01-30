import { Transform } from 'class-transformer';

import { formatDateToClass, formatDateToPlain, formatObjectToField } from '../../../core/helpers';
import { ActivityTypeModel, ProjectModel, DirectionModel } from '../dictionary';
import { UserModel } from '../user';
import { format } from 'date-fns';


export class ActivityModel {
  constructor(public currentDate?: Date) {
    if (this.currentDate) {
      this.activityDate = this.currentDate;
    }
  }

  id: number;
  start: string;
  end: string;
  description: string;
  marginBottom: string | number;
  marginTop: string | number;
  backgroundColor: string;
  height: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;

  @Transform(formatDateToPlain(), { toPlainOnly: true })
  @Transform(formatDateToClass(), { toClassOnly: true })
  activityDate?: Date | string;

  @Transform(formatObjectToField('id'), { toPlainOnly: true })
  project: ProjectModel | number;

  @Transform(formatObjectToField('id'), { toPlainOnly: true })
  direction: DirectionModel | number;

  @Transform(formatObjectToField('id'), { toPlainOnly: true })
  type: ActivityTypeModel | number;

  user: UserModel | number;
}

export class ActivityWeekModel {
  day: number;
  activities: ActivityModel[];
}

export class ActivityValidation {
  @Transform(formatDateToPlain(), { toPlainOnly: true })
  activityDate: string;
  start: string;
  end: string;
  ok: boolean;
}

class ActivityParam {
  constructor(user: number) {
    this.user = user;
  }

  user: number;
}

export class ActivityDayParam extends ActivityParam {
  constructor(user: number, activityDate) {
    super(user);
    this.activityDate = format(activityDate, 'yyyy-MM-dd');
  }

  activityDate: string;
}

export class ActivityWeekParam extends ActivityParam {
  constructor(user: number, monday: Date, sunday: Date) {
    super(user);
    this.monday = format(monday, 'yyyy-MM-dd');
    this.sunday = format(sunday, 'yyyy-MM-dd');
  }

  monday: string;
  sunday: string;
}
