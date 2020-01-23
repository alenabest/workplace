import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DirectionService } from '../../services/direction/direction.service';
import { DirectionModel } from '../../models';
import { DirectionDto } from '../../dto';


@Controller('direction')
export class DirectionController {

  constructor(private readonly directionService: DirectionService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiTags('direction')
  @HttpCode(HttpStatus.OK)
  getDirections(@Query() query: DirectionDto): Observable<DirectionModel[]> {
    return this.directionService.getDirections(query)
      .pipe(
        map(directions => plainToClass(DirectionModel, directions))
      );
  }
}
