import { Injectable } from '@nestjs/common';
import { CreateFieldDto, CreateFieldTypeDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './entities/field.entity';
import { FieldType } from './entities/field-type.entity';
import {
  QueryFieldTypeDto,
  QueryFieldTypeResponse,
} from './dto/query-field.dto';

@Injectable()
export class FieldService {
  @InjectRepository(Field)
  private fieldRepo: Repository<Field>;

  @InjectRepository(FieldType)
  private fieldTypeRepo: Repository<FieldType>;

  create(createFieldDto: CreateFieldDto) {
    return 'This action adds a new field';
  }

  async createType(dto: CreateFieldTypeDto) {
    const temp = await this.fieldTypeRepo.save(dto);
    return this.fieldTypeRepo.save(temp);
  }

  findAll() {
    return `This action returns all field`;
  }

  async findTypes(dto: QueryFieldTypeDto) {
    const { page = 1, limit = 10 } = dto;
    const skip = (page - 1) * limit;
    const [types, total] = await this.fieldTypeRepo.findAndCount({
      skip,
      take: limit,
    });
    return {
      data: types,
      total,
      page,
      limit,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} field`;
  }

  update(id: number, updateFieldDto: UpdateFieldDto) {
    return `This action updates a #${id} field`;
  }

  remove(id: number) {
    return `This action removes a #${id} field`;
  }
}
