import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const users = await this.findOne(createUserDto.email);
    console.log();
    if (!users?.length) {
      const userTmp = await this.userRepository.create(createUserDto);
      return this.userRepository.save(userTmp);
    }
    throw new HttpException('用户邮箱已存在', HttpStatus.CONFLICT);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    const user = await this.userRepository.findBy({ email });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
