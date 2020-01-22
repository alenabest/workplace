import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityTypeModule } from './activity-type/activity-type.module';
import { ActivityModule } from './activity/activity.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),

    ActivityTypeModule,
    ActivityModule,
    ProjectModule,
    UserModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
