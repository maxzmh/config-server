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
import { UpdateFieldDto } from './dto/update-field.dto';
import {
  QueryFieldTypeDto,
  QueryFieldTypeResponse,
} from './dto/query-field.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FieldType } from './entities/field-type.entity';

@ApiTags('Field')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
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
  findAll() {
    return this.fieldService.findAll();
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
  update(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldService.update(+id, updateFieldDto);
  }

  @Patch('type/:id')
  @ApiOperation({ summary: '更新字段类型' })
  @ApiOkResponse({ type: FieldType })
  updateType(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldService.updateType(+id, updateFieldDto);
  }

  @Delete()
  remove(@Query('ids', ParseArrayPipe) ids: number[]) {
    return this.fieldService.remove(ids);
  }

  @Delete('type')
  @ApiOperation({ summary: '删除字段类型' })
  removeType(@Query('ids', ParseArrayPipe) ids: number[]) {
    return this.fieldService.removeType(ids);
  }
}
