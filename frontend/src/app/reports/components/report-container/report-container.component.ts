import { Component, Input, OnDestroy } from '@angular/core';
import { SnackBarService } from '../../../core/services/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { endOfMonth, startOfMonth } from 'date-fns';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { ReportModel, ReportTypeMap } from '../../../common/models/report';
import { SubjectService } from '../../../core/services/subject';
import { ReportService } from '../../../core/services/report';
import { ReportParam } from '../../../common/models/params';


@UntilDestroy()
@Component({
  selector: 'report-container',
  templateUrl: './report-container.component.html',
  styleUrls: ['./report-container.component.scss']
})
export class ReportContainerComponent implements OnDestroy{
  @Input() withDate: boolean = false;
  @Input() report: ReportModel;
  @Input() type: string;

  dateControl: FormControl = new FormControl(new Date());

  reportDateFormat: string = 'LLLL yyyy';

  constructor(private readonly reportService: ReportService,
              private readonly subjectService: SubjectService,
              private readonly snackBarService: SnackBarService) {
  }

  ngOnDestroy() {
  }

  generateReport() {
    this.reportService.generateReports(this.getReportParam())
      .pipe(untilDestroyed(this))
      .subscribe(() => this.subjectService.getReportsSubject.next(true));
  }

  getReportParam(): ReportParam {
    const type: number = ReportTypeMap.get(this.type);
    const startDate: Date = startOfMonth(this.dateControl.value);
    const endDate: Date = endOfMonth(this.dateControl.value);
    return new ReportParam(type, startDate, endDate);
  }

  downloadReport(): void {
    this.reportService.downloadReports(this.report.id)
      .pipe(
        tap(() => this.snackBarService.success('Отчёт загружен')),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
