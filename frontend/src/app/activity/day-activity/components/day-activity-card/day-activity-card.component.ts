import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ActivityModel } from '../../../../common/models/activity';
import { SubjectService } from '../../../../core/services/subject';
import { BaseActivity } from '../../../../common/models/base';
import { HourArray } from '../../../data';


@Component({
  selector: 'day-activity-card',
  templateUrl: './day-activity-card.component.html',
  styleUrls: ['./day-activity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayActivityCardComponent extends BaseActivity implements OnChanges {
  @Input() activities: ActivityModel[];

  scrollTop: number = 0;

  hourArray = HourArray;

  constructor(public dialog: MatDialog,
              public readonly subjectService: SubjectService) {
    super(dialog, subjectService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities && changes.activities.currentValue && changes.activities.currentValue !== changes.activities.previousValue) {
      this.activities.map((item, index) => this.prepareStyle(this.activities, item, index));
      this.scrollTop = this.calculateScrollTop();
    }
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
}
