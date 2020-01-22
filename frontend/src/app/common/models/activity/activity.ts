import { ActivityTypeModel, ProjectModel, TaskModel } from '../dictionary';
import { UserModel } from '../user';


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
  user: UserModel | number;
}

export class ActivityDayParam {
  user: number;
  activityDate: string;
}
