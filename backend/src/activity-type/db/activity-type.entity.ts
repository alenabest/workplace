import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '../../task/db';
import { User } from '../../user/db';

@Entity()
export class ActivityType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToOne(() => Task, task => task.types, {eager: true})
  task: Task;

  @ManyToOne(() => User)
  user: User;
}
