import { Type } from 'class-transformer';

import { WeekActivityModel } from './week-activity';


export class MonthActivityModel {
  week: number;

  @Type(() => WeekActivityModel)
  days: WeekActivityModel[];
}
