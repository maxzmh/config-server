import { Group } from 'src/user/entities/group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldType } from './field-type.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'cn_name' })
  cnName: string;
  @Column({
    unique: true,
  })
  key: string;
  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;
  @ManyToOne(() => FieldType)
  @JoinColumn({ name: 'field_type_id' })
  fieldType: FieldType;
}
