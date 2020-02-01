export class ProjectModel {
  id: number;
  name: string;
  user: number;
}

export class DirectionModel {
  id: number;
  name: string;
  project: ProjectModel | number;
  user: number;
}

export class ActivityTypeModel {
  id: number;
  name: string;
  direction: DirectionModel | number;
  user: number;
}

export class WeekLabelModel {
  label: string;
  date: Date;
}

export class WeekListModel {
  label: number;
  days: Date[];
}
