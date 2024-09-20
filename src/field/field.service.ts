import { Injectable } from '@nestjs/common';
import { CreateFieldDto, CreateFieldTypeDto } from './dto/create-field.dto';
import { UpdateFieldDto, UpdateFieldTypeDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './entities/field.entity';
import { FieldType } from './entities/field-type.entity';
import { QueryFieldTypeDto } from './dto/query-field.dto';

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
    const { page = 1, limit = 10, name = '', type = '' } = dto;
    const skip = (page - 1) * limit;
    const queryBuilder = this.fieldTypeRepo.createQueryBuilder('fieldType');
    if (name === type) {
      queryBuilder
        .where('fieldType.name LIKE :name', { name: `%${name}%` })
        .orWhere('fieldType.type LIKE :type', { type: `%${type}%` });
    } else {
      if (name) {
        queryBuilder.where('fieldType.name LIKE :name', { name: `%${name}%` });
      }
      if (type) {
        queryBuilder.where('fieldType.type LIKE :type', { type: `%${type}%` });
      }
    }

    const [types, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

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

  updateType(id: number, dto: UpdateFieldTypeDto) {
    return this.fieldTypeRepo.update(id, dto);
  }

  remove(ids: number[]) {
    return `This action removes a #${ids} field`;
  }

  async removeType(ids: number[]) {
    return await this.fieldTypeRepo.delete(ids);
  }
}
