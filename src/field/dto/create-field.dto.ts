import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty({ description: '字段名称' })
  cnName: string;
  @ApiProperty({ description: '字段值' })
  key: string;
  @ApiProperty({ description: '字段类型' })
  fieldTypeId: number;
}

export class CreateFieldTypeDto {
  @ApiProperty({ description: '字段类型 key' })
  @IsString()
  type: string;
  @ApiProperty({ description: '字段名称' })
  @IsString()
  name: string;
  @ApiProperty({ description: '字段可选参数' })
  @IsOptional()
  @IsString()
  options?: string;
}
