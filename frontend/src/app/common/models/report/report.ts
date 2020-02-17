import { Transform } from 'class-transformer';
import { formatDateToClass, formatDateToPlain } from '../../../core/helpers';


export const ReportTypeMap = new Map([
  ['current-month', 0],
  ['final-current-month', 1],
  ['month', 2],
  ['final-month', 3]
]);

export class ReportModel {
  id: number;

  @Transform(formatDateToPlain(), { toPlainOnly: true })
  @Transform(formatDateToClass(), { toClassOnly: true })
  generated?: Date;

  link: string;

  // ReportTypeMap
  type: number;

  // 0 - в процессе
  // 1 - завершен
  // 2 - ошибка
  state: number;
}
