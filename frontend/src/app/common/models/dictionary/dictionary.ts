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
