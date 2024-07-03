
import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsArray()
    content: any[]; // решить вопрос с типом
}