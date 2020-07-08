import { Transform } from 'class-transformer';

import { formatDateToPlain } from '../../core/helpers';


export class ActivityValidation {
  @Transform(formatDateToPlain(), { toPlainOnly: true })
  activityDate: string;
  start: string;
  end: string;
  ok: boolean;
}
