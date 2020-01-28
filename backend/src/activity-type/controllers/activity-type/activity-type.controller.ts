import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ActivityTypeService } from '../../services/activity-type/activity-type.service';
import { ActivityTypeModel } from '../../models';
import { ActivityTypeDto } from '../../dto';


@Controller('activity-type')
export class ActivityTypeController {
  constructor(private readonly activityTypeService: ActivityTypeService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiTags('activity-type')
  @HttpCode(HttpStatus.OK)
  getActivityTypes(@Query() query: ActivityTypeDto): Observable<ActivityTypeModel[]> {
    return this.activityTypeService.getActivityTypes(query)
      .pipe(
        map(activityTypes => plainToClass(ActivityTypeModel, activityTypes))
      );
  }
}
