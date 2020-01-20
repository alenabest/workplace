import { Transform } from 'class-transformer';

import { getPropertyToClass } from '../../core/model-helpers';
import { TaskModel } from '../../task/models';


export class ActivityTypeModel {
  id: number;
  name: string;

  @Transform(getPropertyToClass('id'), { toClassOnly: true })
  task: TaskModel | number;
}
