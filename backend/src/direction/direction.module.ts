import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DirectionController } from './controllers/direction/direction.controller';
import { DirectionService } from './services/direction/direction.service';
import { Direction } from './db';


@Module({
  imports: [TypeOrmModule.forFeature([Direction])],
  controllers: [DirectionController],
  providers: [DirectionService]
})
export class DirectionModule {
}
