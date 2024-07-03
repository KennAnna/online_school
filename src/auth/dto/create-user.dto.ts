
// src/auth/dto/create-user.dto.ts
import {IsDateString, IsEmail, IsNotEmpty, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsDateString()
    dateOfBirth: Date;

}

