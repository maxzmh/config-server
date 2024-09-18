import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'cn_name' })
  cnName: string;

  @Column({ unique: true })
  value: string;
}
