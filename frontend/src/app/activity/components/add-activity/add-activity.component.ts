import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

import { ActivityDialogComponent } from '../../dialogs/activity-dialog';
import { BaseDestroy } from '../../../common/models/base-destroy';
import { ActivityModel } from '../../../common/models/activity';
import { SubjectService } from '../../../core/services/subject';

@Component({
  selector: 'add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent extends BaseDestroy {
  @Input() currentDate: Date;
  constructor(private dialog: MatDialog,
              private readonly subjectService: SubjectService) {
    super();
  }

  openActivityDialog() {
    this.dialog.open(ActivityDialogComponent, {disableClose: true, data: new ActivityModel(this.currentDate)})
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((result: Date) => this.reloadActivityPage(result));
  }

  reloadActivityPage(date: Date) {
    if (date) {
      this.subjectService.getActivitySubject.next(date);
    }
  }
}
