import { MatDialog } from '@angular/material';

import { SubjectService } from '../../../core/services/subject';
import { BackgroundColors } from '../../../activity/data';
import { BaseActivity } from './base-activity';
import { getRandomElement } from '../../utils';
import { ActivityModel } from '../activity';


export class BaseDayActivity extends BaseActivity {
  constructor(public dialog: MatDialog,
              public readonly subjectService: SubjectService) {
    super(dialog, subjectService);
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
