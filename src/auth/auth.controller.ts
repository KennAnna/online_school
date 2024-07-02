import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {ApiTags} from "@nestjs/swagger";
@ApiTags('АВТОРИЗАЦИЯ')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.register(createUserDto);
        return {
            userId: user,
            message: 'User registered successfully',
        };
    }
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const token = await this.authService.login(loginUserDto);
        return {
            token,
            message: 'Login successful',
        };
    }
}
