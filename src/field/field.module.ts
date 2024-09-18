import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';
import { FieldType } from './entities/field-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Field, FieldType])],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
