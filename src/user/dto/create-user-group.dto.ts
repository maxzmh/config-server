import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: '用户名称' })
  @Length(4, 16, { message: '用户名称长度在4-16位之间' })
  userName: string;

  @ApiProperty({ description: '用户密码' })
  password: string;

  @ApiProperty({ description: '用户邮箱' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
}
