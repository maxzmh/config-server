import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { FieldType } from '../entities/field-type.entity';

export class QueryFieldDto {}

export class QueryFieldTypeDto {
  @ApiProperty({ description: '页码' })
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '每页条数' })
  limit?: number;
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
