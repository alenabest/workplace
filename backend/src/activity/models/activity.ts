import { Transform } from 'class-transformer';
import { getPropertyToClass } from '../../core/model-helpers';
import { UserModel } from '../../user/models';
import { ActivityTypeModel } from '../../activity-type/models';
import { DirectionModel } from '../../direction/models';
import { ProjectModel } from '../../project/models';


export class ActivityListModel {
  id: number;
  start: string;
  end: string;
  description: string;
  height: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;

  @Transform(getPropertyToClass('name'), { toClassOnly: true })
  project: ProjectModel | string;

  @Transform(getPropertyToClass('name'), { toClassOnly: true })
  direction: DirectionModel | string;

  @Transform(getPropertyToClass('name'), { toClassOnly: true })
  type: ActivityTypeModel | string;

  @Transform(getPropertyToClass('id'), { toClassOnly: true })
  user: UserModel | number;
}
