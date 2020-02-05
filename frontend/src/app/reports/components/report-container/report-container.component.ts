import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'report-container',
  templateUrl: './report-container.component.html',
  styleUrls: ['./report-container.component.scss']
})
export class ReportContainerComponent implements OnInit {
  @Input() reportLink: string;
  @Input() reportInProcess: boolean = false;
  @Input() reportDate: Date = new Date();
  @Input() withDate: boolean = false;

  dateControl: FormControl = new FormControl(new Date());

  reportDateFormat: string = 'LLLL yyyy';

  constructor() { }

  ngOnInit() {
  }

  getReportByMonth() {
    console.log(this.dateControl.value);
    this.reportLink = null;
    this.reportInProcess = true;
    setTimeout(() => {
      this.reportInProcess = false;
      this.reportLink = 'asdadsad';
    }, 3000);
  }
}
