import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from '../../project/db';
import { ActivityType } from '../../activity-type/db';
import { User } from '../../user/db';


@Entity()
export class Direction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToOne(() => Project, project => project.directions, {eager: true})
  project: Project;

  @OneToMany(() => ActivityType, activityType => activityType.direction)
  types: ActivityType[];

  @ManyToOne(() => User)
  user: User;
}
