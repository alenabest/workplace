import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Project } from '../../project/db';
import { ActivityType } from '../../activity-type/db';
import { User } from '../../user/db';


@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToOne(() => Project, project => project.tasks, {eager: true})
  project: Project;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => ActivityType, activityType => activityType.task)
  types: ActivityType[];
}
