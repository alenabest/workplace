import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityType } from '../../activity-type/db';
import { Project } from '../../project/db';
import { Task } from '../../task/db';
import { User } from '../../user/db';


@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, default: '' })
  description: string;

  @Column({ type: 'text', nullable: false })
  activityDate: string;

  @Column({ type: 'text', nullable: false })
  start: string;

  @Column({ type: 'text', nullable: false })
  end: string;

  @Column({ type: 'integer', nullable: false })
  startHour: number;

  @Column({ type: 'integer', nullable: false })
  startMinute: number;

  @Column({ type: 'integer', nullable: false })
  endHour: number;

  @Column({ type: 'integer', nullable: false })
  endMinute: number;

  @Column({ type: 'text', nullable: false })
  height: string;

  @ManyToOne(() => Project, { eager: true })
  project: Project;

  @ManyToOne(() => Task, { eager: true })
  task: Task;

  @ManyToOne(() => ActivityType, { eager: true })
  type: ActivityType;

  @ManyToOne(() => User, { eager: true })
  user: User;
}
