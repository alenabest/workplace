export class ProjectModel {
  id: number;
  name: string;
}

export class DirectionModel {
  id: number;
  name: string;
  project: ProjectModel | number;
}

export class ActivityTypeModel {
  id: number;
  name: string;
  direction: DirectionModel | number;
}
