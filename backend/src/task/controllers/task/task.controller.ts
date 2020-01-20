import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TaskService } from '../../services/task/task.service';
import { TaskModel } from '../../models';
import { TaskDto } from '../../dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiTags('task')
  @HttpCode(HttpStatus.OK)
  getTasks(@Query() query: TaskDto): Observable<TaskModel[]> {
    return this.taskService.getTasks(query)
      .pipe(
        map(tasks => plainToClass(TaskModel, tasks))
      );
  }
}
