import { Transform } from 'class-transformer';

import { getPropertyToClass } from '../../core/model-helpers';
import { DirectionModel } from '../../direction/models';


export class ActivityTypeModel {
  id: number;
  name: string;

  @Transform(getPropertyToClass('id'), { toClassOnly: true })
  direction: DirectionModel | number;
}
