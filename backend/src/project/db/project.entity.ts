import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Direction } from '../../direction/db';
import { User } from '../../user/db';


@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Direction, direction => direction.project)
  directions: Direction[];
}
