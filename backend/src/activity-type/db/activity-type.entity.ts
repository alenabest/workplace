import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Direction } from '../../direction/db';
import { User } from '../../user/db';

@Entity()
export class ActivityType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToOne(() => Direction, direction => direction.types, {eager: true})
  direction: Direction;

  @ManyToOne(() => User)
  user: User;
}
