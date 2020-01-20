import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '../../task/db';
import { User } from '../../user/db';


@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}
