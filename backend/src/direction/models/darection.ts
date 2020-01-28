import { Transform } from 'class-transformer';

import { getPropertyToClass } from '../../core/model-helpers';
import { ProjectModel } from '../../project/models';


export class DirectionModel {
  id: number;
  name: string;

  @Transform(getPropertyToClass('id'), { toClassOnly: true })
  project: ProjectModel | number;
}
