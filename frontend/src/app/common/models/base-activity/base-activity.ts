import { ActivityModel } from '../activity';
import { getRandomElement } from '../../utils';
import { BackgroundColors } from '../../../activity/data';
import { BaseDestroy } from '../base-destroy';


export class BaseActivity extends BaseDestroy {
  constructor() {
    super();
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
