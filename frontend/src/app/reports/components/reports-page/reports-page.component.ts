import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SubjectService } from '../../../core/services/subject';
import { ReportService } from '../../../core/services/report';
import { ReportModel } from '../../../common/models/report';
import { ByUserParam } from '../../../common/models/params';
import { LoginService } from '../../../login';


@UntilDestroy()
@Component({
  selector: 'reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit, OnDestroy {
  reports$: Observable<ReportModel[]>;
  userId: number;

  constructor(private readonly reportService: ReportService,
              private readonly subjectService: SubjectService,
              private readonly loginService: LoginService) {
    this.userId = this.loginService.currentUser.id;
    this.subscribeSubjectResult();
  }

  ngOnDestroy() {
  }

  subscribeSubjectResult() {
    this.subjectService.getReportsSubject
      .pipe(untilDestroyed(this))
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
