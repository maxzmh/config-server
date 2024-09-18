import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column()
  @ApiProperty()
  options: string;
}
