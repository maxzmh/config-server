import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FieldType {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  name: string;
}
