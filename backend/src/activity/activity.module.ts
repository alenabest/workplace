import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityController } from './controllers/activity/activity.controller';
import { ActivityService } from './services/activity/activity.service';
import { Activity } from './db';


@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  controllers: [ActivityController],
  providers: [ActivityService]
})

export class ActivityModule {
}
