import { Type } from 'class-transformer';

import { ActivityModel } from './activity';


export class WeekActivityModel {
  day: number;

  @Type(() => ActivityModel)
  activities: ActivityModel[];
}
