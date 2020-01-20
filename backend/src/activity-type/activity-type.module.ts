import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityTypeController } from './controllers/activity-type/activity-type.controller';
import { ActivityTypeService } from './services/activity-type/activity-type.service';
import { ActivityType } from './db';


@Module({
  imports: [TypeOrmModule.forFeature([ActivityType])],
  controllers: [ActivityTypeController],
  providers: [ActivityTypeService]
})
export class ActivityTypeModule {
}
