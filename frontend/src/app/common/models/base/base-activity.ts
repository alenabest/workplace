import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ViewActivityDialogComponent } from '../../../activity/dialogs/view-activity-dialog';
import { ActivityDialogComponent } from '../../../activity/dialogs/activity-dialog';
import { SubjectService } from '../../../core/services/subject';
import { BaseDestroy } from '../base-destroy';
import { ActivityModel } from '../activity';


export class BaseActivity extends BaseDestroy {
  constructor(public dialog: MatDialog,
              public readonly subjectService: SubjectService) {
    super();
  }

  openViewDialog(activity: ActivityModel) {
    this.dialog.open(ViewActivityDialogComponent, { data: activity })
      .afterClosed()
      .pipe(
        switchMap(result => {
          if (result) {
            return this.openUpdateActivityDialog(activity);
          }
          return of();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => this.reloadActivityPage(result));
  }

  reloadActivityPage(result) {
    if (result) {
      this.subjectService.getActivitySubject.next(result);
    }
  }

  openUpdateActivityDialog(activity: ActivityModel): Observable<any | undefined> {
    return this.dialog.open(ActivityDialogComponent, { disableClose: true, data: activity })
      .afterClosed();
  }
}
