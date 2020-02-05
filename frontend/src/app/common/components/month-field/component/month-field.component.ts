import { Component, Input } from '@angular/core';
import { MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';
import { FormControl } from '@angular/forms';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/yyyy'
  },
  display: {
    dateInput: 'LLLL yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM yyyy'
  }
};

@Component({
  selector: 'month-field',
  templateUrl: './month-field.component.html',
  styleUrls: ['./month-field.component.scss'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class MonthFieldComponent {
  @Input() dateControl: FormControl = new FormControl();

  selectMonth(selectedDate: Date, datepicker: MatDatepicker<any>) {
    this.dateControl.setValue(selectedDate);
    datepicker.close();
  }
}
