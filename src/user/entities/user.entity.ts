import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'user_name' })
  userName: string;
  @Column()
  password: string;
  @Column({
    unique: true,
  })
  email: string;
}
