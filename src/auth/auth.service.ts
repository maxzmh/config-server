import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        let user = await this.usersService.findOne(username);
        if (user[0] && user[0].password === pass) {
            const { password, ...result } = user[0];
            return result;
        }
        return null;
    }

    async login(user: User) {
        const validUser = await this.validateUser(user.userName, user.password);
        if (!validUser) {
            throw new UnauthorizedException('用户名或密码错误');
        }
        const payload = { userName: user.userName, sub: user.email, password: user.password };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}