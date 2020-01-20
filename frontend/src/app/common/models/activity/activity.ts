import { ActivityTypeModel, ProjectModel, TaskModel } from '../dictionary';


export class ActivityModel {
  id: number;
  start: string;
  end: string;
  description: string;
  marginBottom: string | number;
  marginTop: string | number;
  backgroundColor: string;
  height: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  project: ProjectModel | number;
  task: TaskModel | number;
  type: ActivityTypeModel | number;
}
