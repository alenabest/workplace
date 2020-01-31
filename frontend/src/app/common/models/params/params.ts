import { format } from 'date-fns';


class ActivityParam {
  constructor(user: number) {
    this.user = user;
  }

  user: number;
}

export class DayActivityParam extends ActivityParam {
  constructor(user: number, activityDate) {
    super(user);
    this.activityDate = format(activityDate, 'yyyy-MM-dd');
  }

  activityDate: string;
}

export class WeekActivityParam extends ActivityParam {
  constructor(user: number, monday: Date, sunday: Date) {
    super(user);
    this.monday = format(monday, 'yyyy-MM-dd');
    this.sunday = format(sunday, 'yyyy-MM-dd');
  }

  monday: string;
  sunday: string;
}

export class DictionaryParamModel {
  constructor(userId: number, projects?: number, directions?: number) {
    this.user = userId;
    this.projects = projects;
    this.directions = directions;
  }
  user: number;
  projects: number;
  directions: number;
}
