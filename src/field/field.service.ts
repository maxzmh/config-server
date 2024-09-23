import { Injectable } from '@nestjs/common';
import { CreateFieldDto, CreateFieldTypeDto } from './dto/create-field.dto';
import { UpdateFieldDto, UpdateFieldTypeDto } from './dto/update-field.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './entities/field.entity';
import { FieldType } from './entities/field-type.entity';
import { QueryFieldDto, QueryFieldTypeDto } from './dto/query-field.dto';

@Injectable()
export class FieldService {
  @InjectRepository(Field)
  private fieldRepo: Repository<Field>;

  @InjectRepository(FieldType)
  private fieldTypeRepo: Repository<FieldType>;

  async create(dto: CreateFieldDto) {
    const type: FieldType = await this.fieldTypeRepo.findOneBy({
      id: dto.fieldTypeId,
    });

    if (!type) {
      throw new Error('Field type not found');
    }
    const field = new Field();
    field.fieldType = type;
    field.cnName = dto.cnName;
    field.key = dto.key;
    const temp = await this.fieldRepo.create(field);
    return this.fieldRepo.save(temp);
  }

  async createType(dto: CreateFieldTypeDto) {
    const temp = await this.fieldTypeRepo.save(dto);
    return this.fieldTypeRepo.save(temp);
  }

  async findAll(dto: QueryFieldDto) {
    const { page = 1, limit = 10, cnName = '', key = '' } = dto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.fieldRepo
      .createQueryBuilder('field')
      .leftJoinAndSelect('field.fieldType', 'fieldType');
    if (cnName === key) {
      queryBuilder
        .where('field.cnName LIKE :name', { name: `%${cnName}%` })
        .orWhere('field.key LIKE :key', { key: `%${key}%` });
    } else {
      if (cnName) {
        queryBuilder.where('field.cnName LIKE :name', {
          name: `%${cnName}%`,
        });
      }
      if (key) {
        queryBuilder.where('field.key LIKE :key', { key: `%${key}%` });
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

  async update(id: number, dto: UpdateFieldDto) {
    const fieldType = await this.fieldTypeRepo.findOneBy({
      id: dto.fieldTypeId,
    });
    const field = new Field();
    field.cnName = dto.cnName;
    field.fieldType = fieldType;
    field.key = dto.key;
    return this.fieldRepo.update(id, field);
  }

  updateType(id: number, dto: UpdateFieldTypeDto) {
    return this.fieldTypeRepo.update(id, dto);
  }

  remove(ids: number[]) {
    return this.fieldRepo.delete(ids);
  }

  async removeType(ids: number[]) {
    return await this.fieldTypeRepo.delete(ids);
  }
}
