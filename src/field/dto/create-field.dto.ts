import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateFieldDto {}

export class CreateFieldTypeDto {
  @ApiProperty({ description: '字段类型 key' })
  type: string;
  @ApiProperty({ description: '字段名称' })
  name: string;
  @ApiProperty({ description: '字段可选参数' })
  @IsOptional()
  options: string;
}
