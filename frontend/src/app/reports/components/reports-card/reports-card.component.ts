import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReportModel, ReportTypeMap } from '../../../common/models/report';
import { isOnChange } from '../../../common/utils';


@Component({
  selector: 'reports-card',
  templateUrl: './reports-card.component.html',
  styleUrls: ['./reports-card.component.scss']
})
export class ReportsCardComponent implements OnChanges {
  @Input() reports: ReportModel[];

  reportByCurrentMonth: ReportModel;
  finalReportByCurrentMonth: ReportModel;
  reportByMonth: ReportModel;
  finalReportByMonth: ReportModel;

  ngOnChanges(changes: SimpleChanges): void {
    if (isOnChange(changes.reports)) {
      this.reportByCurrentMonth = this.getReportByType('current-month');
      this.finalReportByCurrentMonth = this.getReportByType('final-current-month');
      this.reportByMonth = this.getReportByType('month');
      this.finalReportByMonth = this.getReportByType('final-month');
    }
  }

  getReportByType(key: string): ReportModel {
    return this.reports.find(item => item.type === this.getType(key));
  }

  getType(key: string): number {
    return ReportTypeMap.get(key);
  }
}
