import { formatDateToBacked } from '../../../core/helpers';
import { WeekListModel } from '../dictionary';


export class ByUserParam {
  constructor(user: number) {
    this.user = user;
  }

  user: number;
}

export class ByQueryParam {
  constructor(search?: string) {
    this.search = search;
  }
  search: string;
}

export class UserParam extends ByQueryParam {
  constructor(search?: string) {
    super(search);
  }
  role?: string;
  ordering?: string;
}

export class DayActivityParam extends ByUserParam {
  constructor(user: number, activityDate) {
    super(user);
    this.activityDate = formatDateToBacked(activityDate);
  }

  activityDate: string;
}

export class WeekActivityParam extends ByUserParam {
  constructor(user: number, monday: Date, sunday: Date) {
    super(user);
    this.monday = formatDateToBacked(monday);
    this.sunday = formatDateToBacked(sunday);
  }

  monday: string;
  sunday: string;
}

export class MonthActivityParam extends ByUserParam {
  constructor(user: number, start: Date, end: Date, weekList: WeekListModel[]) {
    super(user);
    this.weekList = this.getWeekList(weekList);
    this.start = formatDateToBacked(start);
    this.end = formatDateToBacked(end);
  }

  start: string;
  end: string;
  weekList: string[][];

  private getWeekList(weekList: WeekListModel[]): string[][] {
    return weekList.map(week => week.days.map(day => formatDateToBacked(day)));
  }
}

export class DictionaryParam {
  constructor(userId: number, projects?: number, directions?: number, search?: string) {
    this.user = userId;
    this.projects = projects;
    this.directions = directions;
    this.search = search;
  }

  user: number;
  projects: number;
  directions: number;
  search: string;
  ordering: string = 'name';
}

export class ReportParam {
  constructor(type: number, startDate: Date, endDate: Date) {
    this.type = type;
    this.start = formatDateToBacked(startDate);
    this.end = formatDateToBacked(endDate);
  }

  type: number;
  start: string;
  end: string;
}
