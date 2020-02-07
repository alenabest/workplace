import { Transform, Type } from 'class-transformer';

import { formatDateToClass, formatDateToPlain, formatObjectToField } from '../../../core/helpers';
import { ActivityTypeModel, DirectionModel, ProjectModel } from '../dictionary';
import { UserModel } from '../user';


export class ActivityModel {
  constructor(private currentDate?: Date, private startTime?: string) {
    this.activityDate = currentDate;
    this.start = startTime;
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
  duration: number;

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

export class WeekActivityModel {
  day: number;

  @Type(() => ActivityModel)
  activities: ActivityModel[];
}

export class MonthActivityModel {
  week: number;

  @Type(() => WeekActivityModel)
  days: WeekActivityModel[];
}

export class ActivityValidation {
  @Transform(formatDateToPlain(), { toPlainOnly: true })
  activityDate: string;
  start: string;
  end: string;
  ok: boolean;
}

