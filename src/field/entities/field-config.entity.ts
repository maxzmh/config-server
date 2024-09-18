import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Platform } from './platform.entity';
import { Field } from './field.entity';
import { Group } from 'src/user/entities/group.entity';

@Entity()
export class FieldConfig {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;
  @ManyToOne(() => Platform)
  @JoinColumn({ name: 'platform_id' })
  platform: Platform;
  @ManyToOne(() => Field)
  @JoinColumn({ name: 'field_id' })
  field: Field;
  @Column()
  disabled: boolean;
  @Column({ name: 'display_order' })
  displayOrder: number;
  @Column()
  sortable: boolean;
  @Column()
  choose: boolean;
}
