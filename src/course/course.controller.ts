
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('КУРСЫ')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto, @Req() req) {
    const userId = req.user.userId;
    const course = await this.courseService.createCourse(createCourseDto, userId);
    return {
      courseId: course.courseId,
      message: 'Course created successfully',
    };
  }
}
