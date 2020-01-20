export class ProjectModel {
  id: number;
  name: string;
}

export class TaskModel {
  id: number;
  name: string;
  project: ProjectModel | number;
}

export class ActivityTypeModel {
  id: number;
  name: string;
  task: TaskModel | number;
}
