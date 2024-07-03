import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import {DataSource} from 'typeorm';
import {UserEntity} from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly jwtService: JwtService,
    ) {
    }

    async register(createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const {password, ...user} = await this.dataSource.getRepository(UserEntity).save(createUserDto);
        const payload = {email: user.email, sub: user.userId};

        const token = this.jwtService.sign(payload);
        return {
            user,
            token
        }
    }

    async login(loginUserDto: LoginUserDto) {

        const {password, ...user}= await this.dataSource
            .getRepository(UserEntity)
            .findOne({
                where: {
                    email:loginUserDto.email
                }
            });
        const passwordIsCorrect = await bcrypt.compare(loginUserDto.password,password)
        if (!user || !passwordIsCorrect) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {email: user.email, sub: user.userId};
        const token = this.jwtService.sign(payload)
        return {
            token,
            user
        }
    }
}