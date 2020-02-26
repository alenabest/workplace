import { Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { BaseDestroy } from '../../../common/models/base-destroy';
import { SubjectService } from '../../../core/services/subject';
import { ReportService } from '../../../core/services/report';
import { ReportModel } from '../../../common/models/report';
import { ByUserParam } from '../../../common/models/params';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent extends BaseDestroy implements OnInit {
  reports$: Observable<ReportModel[]>;
  userId: number;

  constructor(private readonly reportService: ReportService,
              private readonly subjectService: SubjectService,
              private readonly authService: AuthService) {
    super();
    this.userId = this.authService.currentUser.id;
    this.subscribeSubjectResult();
  }

  subscribeSubjectResult() {
    this.subjectService.getReportsSubject
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.getReports());
  }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.reports$ = this.reportService.getReports(new ByUserParam(this.userId))
      .pipe(
        map(response => response.results)
      );
  }
}
