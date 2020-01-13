import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  username: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @Column({ type: 'text', nullable: true, default: '' })
  firstName: string;

  @Column({ type: 'text', nullable: true, default: '' })
  middleName: string;

  @Column({ type: 'text', nullable: true, default: '' })
  lastName: string;

  @Column({ type: 'text', nullable: false, default: '' })
  email: string;

  @Column({ type: 'text', nullable: true, default: '' })
  mobile: string;

  @Column({ type: 'text', nullable: true, default: '' })
  phone: string;

  @Column({ type: 'text', nullable: true })
  birthday: string;

  @Column({ type: 'text', nullable: true })
  avatar: string;
}
