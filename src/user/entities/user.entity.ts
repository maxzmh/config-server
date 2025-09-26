import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'user_name', unique: true, })
  userName: string;
  @Column()
  password: string;
  email: string;
}
