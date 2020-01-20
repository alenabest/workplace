import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { TaskModel } from '../../models';
import { TaskDto } from '../../dto';
import { Task } from '../../db';


@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task)
              private readonly taskRepository: Repository<Task>) {
  }

  getTasks(query: TaskDto): Observable<TaskModel[]> {
    return from(this.taskRepository.find({ where: query }));
  }
}
