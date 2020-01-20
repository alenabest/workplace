import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { ActivityTypeModule } from './activity-type/activity-type.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),

    UserModule,
    AuthModule,
    ProjectModule,
    TaskModule,
    ActivityTypeModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
