import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PublicRoute } from 'src/common/decorators/public-route/public-route.decorator';
import { AuthService } from './auth.service'
import { User } from 'src/user/entities/user.entity';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @PublicRoute()
    @Post('/')
    async login(@Body() user: User) {
        return this.authService.login(user);
    }
}
