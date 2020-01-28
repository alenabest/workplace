import { ActivityTypeModel, ProjectModel, DirectionModel } from '../dictionary';
import { UserModel } from '../user';
import { Transform } from 'class-transformer';
import { formatDateToClass, formatDateToPlain } from '../../../core/helpers';


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

  project: ProjectModel | number | string;
  direction: DirectionModel | number | string;
  type: ActivityTypeModel | number | string;
  user: UserModel | number;
}

export class ActivityDayParam {
  user: number;
  activityDate: string;
}
