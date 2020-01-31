import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ViewActivityDialogComponent } from '../../../activity/dialogs/view-activity-dialog';
import { ActivityDialogComponent } from '../../../activity/dialogs/activity-dialog';
import { SubjectService } from '../../../core/services/subject';
import { BackgroundColors } from '../../../activity/data';
import { getRandomElement } from '../../utils';
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

  prepareStyle(activities: ActivityModel[], item: ActivityModel, index: number): ActivityModel {
    item.backgroundColor = getRandomElement<string>(BackgroundColors);
    return this.calculateMargin(activities, item, index);
  }

  calculateMargin(activities: ActivityModel[], item: ActivityModel, index: number): ActivityModel {
    item.marginBottom = this.calculateMarginBottom(activities, item, index);

    if (index === 0) {
      item.marginTop = item.startHour * 60 + item.startMinute + 'px';
    }

    return item;
  }

  calculateMarginBottom(activities: ActivityModel[], item: ActivityModel, index: number): string | number {
    if (activities.length === 1 || (activities.length - 1) === index) {
      return 0;
    }

    const nextItem = activities[index + 1];
    const hours = nextItem.startHour - item.endHour;
    const minutes = nextItem.startMinute - item.endMinute;

    return hours * 60 + minutes + 'px';
  }
}
