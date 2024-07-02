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

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        createUserDto.password = hashedPassword;
        const user = await this.dataSource.getRepository(UserEntity).save(createUserDto);
        const payload = {email: user.email, sub: user.userId};

        const token = await this.jwtService.sign(payload);
        return {
            user,
            token
        }

    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.dataSource.getRepository(UserEntity).findOne({where: {email}});
        if (user && await bcrypt.compare(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(loginUserDto: LoginUserDto) {
        const {email, password} = loginUserDto;

        const user = await this.dataSource.getRepository(UserEntity).findOne({where: {email}});

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {email: user.email, sub: user.userId};
        return this.jwtService.sign(payload);
    }
}