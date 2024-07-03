import {Injectable} from '@nestjs/common';
import {DataSource, Repository} from 'typeorm';
import {CourseEntity} from './entities/course.entity';
import {CreateCourseDto} from './dto/create-course.dto';


@Injectable()
export class CourseService {
    constructor(
        private readonly dataSource: DataSource,
    ) {
    }

    createCourse(createCourseDto: CreateCourseDto, userId: number): Promise<CourseEntity> {
        return this.dataSource.getRepository(CourseEntity).save({
            ...createCourseDto,
            userId
        })
    }
}