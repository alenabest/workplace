import { Pipe, PipeTransform } from '@angular/core';
import { ru as locale } from 'date-fns/locale';
import { isDate, format } from 'date-fns';


@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date, dateFormat: string): any {
    if (value && isDate(value)) {
      return format(value, dateFormat, { locale });
    }

    return null;
  }

}
