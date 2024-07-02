
// src/auth/dto/create-user.dto.ts
import {IsDateString, IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsDateString()
    dateOfBirth: Date;

}

