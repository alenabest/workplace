export class ProjectModel {
  constructor(user: number) {
    this.user = user;
  }
  id: number;
  name: string;
  user: number;
}

export class DirectionModel {
  constructor(user: number) {
    this.user = user;
  }
  id: number;
  name: string;
  project: ProjectModel | number;
  user: number;
}

export class ActivityTypeModel {
  constructor(user: number) {
    this.user = user;
  }
  id: number;
  name: string;
  direction: DirectionModel | number;
  user: number;
}
