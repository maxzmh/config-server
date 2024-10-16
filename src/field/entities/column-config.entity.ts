import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ColumnConfig {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  @ApiProperty()
  name: string;
  @Column()
  @ApiProperty()
  description: string;
  @ApiProperty()
  @Column({
    type: 'json',
  })
  columns?: any[];
  @CreateDateColumn({
    type: 'datetime',
    name: 'created_at',
  })
  @ApiProperty()
  createdAt?: Date;
  @UpdateDateColumn({
    type: 'datetime',
    name: 'updated_at',
  })
  @ApiProperty()
  updatedAt?: Date;
}
