import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ViewActivityDialogComponent } from '../../../activity/dialogs/view-activity-dialog';
import { ActivityDialogComponent } from '../../../activity/dialogs/activity-dialog';
import { SubjectService } from '../../../core/services/subject';
import { BaseDestroy } from '../base-destroy';
import { ActivityModel } from '../activity';
import { ActivityService } from '../../../core/services/activity';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog';


export class BaseActivity extends BaseDestroy {
  constructor(public readonly activityService: ActivityService,
              public readonly subjectService: SubjectService,
              public dialog: MatDialog) {
    super();
  }

  openViewDialog(activity: ActivityModel) {
    this.dialog.open(ViewActivityDialogComponent, { data: activity })
      .afterClosed()
      .pipe(
        switchMap((result: { open: boolean, delete: boolean }) => this.editOrDeleteActivity(result, activity)),
        takeUntil(this.destroy$)
      )
      .subscribe((result) => this.reloadActivityPage(result));
  }

  editOrDeleteActivity(result: { open: boolean, delete: boolean }, activity: ActivityModel): Observable<any | undefined> {
    if (result.open) {
      return this.openUpdateActivityDialog(activity);
    }
    if (result.delete) {
      return this.openConfirmationDialog(activity.id);
    }
    return of();
  }

  reloadActivityPage(result) {
    if (result) {
      this.subjectService.getActivitySubject.next(result);
    }
  }

  openConfirmationDialog(activityId: number): Observable<any | undefined> {
    const message = 'Удалить активность?';
    return this.dialog.open(ConfirmationDialogComponent, { disableClose: true, data: message })
      .afterClosed()
      .pipe(
        switchMap(result => {
          if (result) {
            return this.activityService.deleteActivity(activityId);
          }
          return of();
        })
      );
  }

  openUpdateActivityDialog(activity: ActivityModel): Observable<any | undefined> {
    return this.dialog.open(ActivityDialogComponent, { disableClose: true, data: activity })
      .afterClosed();
  }

  addActivity(day: Date, hour?: string) {
    const newActivity = new ActivityModel(day, hour);
    this.openUpdateActivityDialog(newActivity)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((result) => this.reloadActivityPage(result));
  }
}
