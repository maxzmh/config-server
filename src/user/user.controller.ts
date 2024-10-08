import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Group } from './entities/group.entity';

@Controller('user')
@ApiTags('User')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('group')
  @ApiOperation({ summary: '查询所有用户组' })
  @ApiOkResponse({ type: Group })
  findUserGroupAll(@Query('groupName') groupName: string) {
    return this.userService.findGroupAll(groupName);
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Get('exists/:email')
  async userEmailExists(@Param('email') email: string) {
    const users: Array<User> = await this.userService.findOne(email);
    return { exists: !!users?.length };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
