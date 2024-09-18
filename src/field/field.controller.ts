import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FieldService } from './field.service';
import { CreateFieldDto, CreateFieldTypeDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import {
  QueryFieldTypeDto,
  QueryFieldTypeResponse,
} from './dto/query-field.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Field')
@Controller('field')
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Post()
  create(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldService.create(createFieldDto);
  }

  @Post('/type')
  createType(@Body() dto: CreateFieldTypeDto) {
    return this.fieldService.create(dto);
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fieldService.remove(+id);
  }
}
