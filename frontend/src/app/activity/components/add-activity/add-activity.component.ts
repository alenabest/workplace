import { Component, Input, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatDialog } from '@angular/material/dialog';

import { ActivityDialogComponent } from '../../dialogs/activity-dialog';
import { ActivityModel } from '../../../common/models/activity';
import { SubjectService } from '../../../core/services/subject';


@UntilDestroy()
@Component({
  selector: 'add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnDestroy {
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
