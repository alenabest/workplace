import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { ViewActivityDialogComponent } from '../../../dialogs/view-activity-dialog';
import { ActivityDialogComponent } from '../../../dialogs/activity-dialog';
import { BaseDestroy } from '../../../../common/models/base-destroy';
import { ActivityModel } from '../../../../common/models/activity';
import { SubjectService } from '../../../../core/services/subject';
import { BackgroundColors, HourArray } from '../../../data';
import { getRandomElement } from '../../../../common/utils';


@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss']
})
export class DayActivityCardComponent extends BaseDestroy implements OnChanges {
  @Input() activities: ActivityModel[];

  scrollTop: number = 0;

  hourArray = HourArray;

  constructor(private dialog: MatDialog,
              private readonly subjectService: SubjectService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities && changes.activities.currentValue && changes.activities.currentValue !== changes.activities.previousValue) {
      this.activities.map((item, index) => this.prepareStyle(item, index));
      this.scrollTop = this.calculateScrollTop();
    }
  }

  openViewDialog(activity: ActivityModel) {
    this.dialog.open(ViewActivityDialogComponent, {data: activity})
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
      .subscribe((result: Date) => this.reloadActivityPage(result));
  }

  reloadActivityPage(date: Date) {
    if (date) {
      this.subjectService.getActivitySubject.next(date);
    }
  }

  openUpdateActivityDialog(activity: ActivityModel): Observable<any | undefined> {
    return this.dialog.open(ActivityDialogComponent, {disableClose: true, data: activity})
      .afterClosed();
  }

  addActivity(hour: string) {
    console.log(hour);
  }

  calculateScrollTop(): number {
    if (!this.activities || this.activities.length === 0) {
      return 0;
    }

    return this.activities[0].startHour * 60;
  }

  prepareStyle(item: ActivityModel, index: number): ActivityModel {
    item.backgroundColor = getRandomElement<string>(BackgroundColors);
    return this.calculateMargin(item, index);
  }

  calculateMargin(item: ActivityModel, index: number): ActivityModel {
    item.marginBottom = this.calculateMarginBottom(item, index);

    if (index === 0) {
      item.marginTop = item.startHour * 60 + item.startMinute + 'px';
    }

    return item;
  }

  calculateMarginBottom(item: ActivityModel, index: number): string | number {
    if (this.activities.length === 1 || (this.activities.length - 1) === index) {
      return 0;
    }

    const nextItem = this.activities[index + 1];
    const hours = nextItem.startHour - item.endHour;
    const minutes = nextItem.startMinute - item.endMinute;

    return hours * 60 + minutes + 'px';
  }
}
