import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Direction } from '../../db';
import { Repository } from 'typeorm';
import { DirectionDto } from '../../dto';
import { from, Observable } from 'rxjs';
import { DirectionModel } from '../../models';
import { createQuery } from '../../../core/create-query';


@Injectable()
export class DirectionService {

  constructor(@InjectRepository(Direction)
              private readonly directionRepository: Repository<Direction>) {
  }

  getDirections(query: DirectionDto): Observable<DirectionModel[]> {
    return from(this.directionRepository.query(createQuery('direction', query)));
  }
}
