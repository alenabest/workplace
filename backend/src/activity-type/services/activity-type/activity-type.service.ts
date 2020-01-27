import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

import { createQuery } from '../../../core/create-query';
import { ActivityTypeModel } from '../../models';
import { ActivityTypeDto } from '../../dto';
import { ActivityType } from '../../db';


@Injectable()
export class ActivityTypeService {
  constructor(@InjectRepository(ActivityType)
              private readonly activityTypeRepository: Repository<ActivityType>) {
  }

  getActivityTypes(query: ActivityTypeDto): Observable<ActivityTypeModel[]> {
    return from(this.activityTypeRepository.query(createQuery('activity_type', query)));
  }
}
