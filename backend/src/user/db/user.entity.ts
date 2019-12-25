import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false, unique: true})
  username: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: false, default: ''})
  firstName: string;

  @Column({nullable: true, default: ''})
  middleName: string;

  @Column({nullable: false, default: ''})
  lastName: string;
}
