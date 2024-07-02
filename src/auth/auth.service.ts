// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import {DataSource} from "typeorm";
import {UserEntity} from "../user/entities/user.entity";


@Injectable()
export class AuthService {
  constructor(
      private readonly dataSource: DataSource,
      private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    // const { name, email, password } = createUserDto;
    //
    //
    // const hashedPassword = await bcrypt.hash(password, 10);
    //
    //
    // const user = new UserEntity();
    // user.name = name;
    // user.email = email;
    // user.password = hashedPassword;
    //
    // return await this.dataSource.getRepository(UserEntity).save(user);
  }

  async login(loginUserDto: LoginUserDto){
  //   const { email, password } = loginUserDto;
  //
  //   const user = await this.dataSource.getRepository(UserEntity).findOne({ where: { email } });
  //
  //   if (!user || !(await bcrypt.compare(password, user.password))) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //
  //   const payload = { email: user.email, sub: user.id };
  //   return this.jwtService.sign(payload);
  }
}
