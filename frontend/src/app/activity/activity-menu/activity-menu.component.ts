import { Component, Input, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';

import { ActivityDialogComponent } from '../activity-dialog';
import { SubjectService } from '../../core/services/subject';
import { ActivityModel } from '../../server-api';


@UntilDestroy()
@Component({
  selector: 'activity-menu',
  templateUrl: './activity-menu.component.html',
  styleUrls: ['./activity-menu.component.scss']
})
export class ActivityMenuComponent implements OnDestroy {
  @Input() currentDate: Date;
  constructor(private dialog: MatDialog,
              private readonly subjectService: SubjectService) {
  }

  ngOnDestroy() {
  }

  openActivityDialog() {
    this.dialog.open(ActivityDialogComponent, {disableClose: true, data: new ActivityModel(this.currentDate)})
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((result) => this.reloadActivityPage(result));
  }

  reloadActivityPage(result) {
    if (result) {
      this.subjectService.getActivitySubject.next(result);
    }
  }
}
