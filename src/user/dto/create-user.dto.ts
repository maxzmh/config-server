import { IsEmail, Length } from 'class-validator';
export class CreateUserDto {
  @Length(4, 16, { message: '用户名称长度在4-16位之间' })
  userName: string;
  password: string;
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;
}
