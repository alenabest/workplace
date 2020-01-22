import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityDayDto } from '../../dto';
import { ActivityListModel } from '../../models';
import { from, Observable } from 'rxjs';
import { Activity } from '../../db';


@Injectable()
export class ActivityService {
  constructor(@InjectRepository(Activity)
              private readonly activityRepository: Repository<Activity>) {
  }

  getDayActivities(query: ActivityDayDto): Observable<ActivityListModel[]> {
    return from(this.activityRepository.find({where: query}));
  }
}
