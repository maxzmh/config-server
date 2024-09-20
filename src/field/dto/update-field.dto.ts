import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDto, CreateFieldTypeDto } from './create-field.dto';

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}

export class UpdateFieldTypeDto extends PartialType(CreateFieldTypeDto) {}
