import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ProjectService } from '../../services/project/project.service';
import { ProjectModel } from '../../models';
import { ProjectDto } from '../../dto';


@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiTags('project')
  @HttpCode(HttpStatus.OK)
  getProjects(@Query() query: ProjectDto): Observable<ProjectModel[]> {
    return this.projectService.getProjects(query)
      .pipe(
        map(projects => plainToClass(ProjectModel, projects))
      );
  }
}
