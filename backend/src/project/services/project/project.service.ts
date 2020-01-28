import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { ProjectModel } from '../../models';
import { ProjectDto } from '../../dto';
import { Project } from '../../db';


@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project)
              private readonly projectRepository: Repository<Project>) {
  }

  getProjects(query: ProjectDto): Observable<ProjectModel[]> {
    return from(this.projectRepository.find({ where: query }));
  }
}
