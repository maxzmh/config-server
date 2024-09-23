import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseArrayPipe,
} from '@nestjs/common';
import { FieldService } from './field.service';
import { CreateFieldDto, CreateFieldTypeDto } from './dto/create-field.dto';
import { UpdateFieldDto, UpdateFieldTypeDto } from './dto/update-field.dto';
import {
  QueryFieldDto,
  QueryFieldsResponse,
  QueryFieldTypeDto,
  QueryFieldTypeResponse,
} from './dto/query-field.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FieldType } from './entities/field-type.entity';
import { Field } from './entities/field.entity';

@ApiTags('Field')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
  @ApiOperation({ summary: '创建字段' })
  @ApiOkResponse({ type: Field })
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldService.create(createFieldDto);
  }

  @Post('/type')
  @ApiOperation({ summary: '创建字段类型' })
  @ApiOkResponse({ type: FieldType })
  createType(@Body() dto: CreateFieldTypeDto) {
    return this.fieldService.createType(dto);
  }

  @Get()
  @ApiOperation({ summary: '分页获取字段列表' })
  @ApiOkResponse({ type: QueryFieldsResponse })
  findAll(@Query() dto: QueryFieldDto): Promise<QueryFieldsResponse> {
    return this.fieldService.findAll(dto);
  }

  @Get('/type')
  @ApiOperation({ summary: '分页获取字段类型' })
  @ApiOkResponse({ type: QueryFieldTypeResponse })
  findTypes(@Query() dto: QueryFieldTypeDto): Promise<QueryFieldTypeResponse> {
    return this.fieldService.findTypes(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fieldService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新字段' })
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldService.update(+id, updateFieldDto);
  }

  @Patch('type/:id')
  @ApiOperation({ summary: '更新字段类型' })
  @ApiOkResponse({ type: FieldType })
  updateType(@Param('id') id: string, @Body() dto: UpdateFieldTypeDto) {
    return this.fieldService.updateType(+id, dto);
  }

  @Delete()
  @ApiOperation({ summary: '删除字段' })
  remove(@Query('ids', ParseArrayPipe) ids: number[]) {
    return this.fieldService.remove(ids);
  }

  @Delete('type')
  @ApiOperation({ summary: '删除字段类型' })
  removeType(@Query('ids', ParseArrayPipe) ids: number[]) {
    return this.fieldService.removeType(ids);
  }
}
