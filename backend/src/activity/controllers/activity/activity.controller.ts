import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ActivityService } from '../../services/activity/activity.service';
import { ActivityListModel } from '../../models';
import { ActivityDayDto } from '../../dto';


@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('day')
  @ApiTags('activity')
  @HttpCode(HttpStatus.OK)
  getDayActivities(@Query() query: ActivityDayDto): Observable<ActivityListModel[]> {
    return this.activityService.getDayActivities(query)
      .pipe(
        map(activities => plainToClass(ActivityListModel, activities))
      );
  }
}
