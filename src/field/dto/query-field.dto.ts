import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { FieldType } from '../entities/field-type.entity';
import { TableQueryParams, TableResponse } from 'src/common/dots/table.dot';
import { Field } from '../entities/field.entity';

export class QueryFieldDto extends TableQueryParams {
  @IsOptional()
  @ApiProperty({ description: '名称' })
  cnName?: string;
  @IsOptional()
  @ApiProperty({ description: '字段类型id' })
  fieldTypeId?: string;
  @IsOptional()
  @ApiProperty({ description: '字段值' })
  key?: string;
}

export class QueryFieldTypeDto {
  @ApiProperty({ description: '页码' })
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '每页条数' })
  limit?: number = 10;

  @IsOptional()
  @ApiProperty({ description: '名称' })
  name?: string;

  @IsOptional()
  @ApiProperty({ description: '类型' })
  type?: string;
}

export class QueryFieldTypeResponse {
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty({
    type: [FieldType],
  })
  data: FieldType[];
  @ApiProperty()
  total: number;
}

export class QueryFieldsResponse extends TableResponse {
  @ApiProperty({
    type: [Field],
  })
  data: Field[];
}
