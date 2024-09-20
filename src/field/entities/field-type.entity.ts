import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FieldType {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  @Column({
    unique: true,
  })
  @ApiProperty()
  type: string;
  @ApiProperty()
  @Column()
  name: string;
  @Column({
    nullable: true,
  })
  @ApiProperty()
  options?: string;
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
