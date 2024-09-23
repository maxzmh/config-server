import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FieldType } from './field-type.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'cn_name' })
  @ApiProperty()
  cnName: string;

  @Column({
    unique: true,
  })
  @ApiProperty()
  key: string;

  @ManyToOne(() => FieldType)
  @JoinColumn({ name: 'field_type_id' })
  @ApiProperty()
  fieldType: FieldType;
}
