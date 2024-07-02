import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user_course')
export class UserCourseEntity {
    @PrimaryColumn({ name: 'user_id' })
    userId: number;

    @PrimaryColumn({ name: 'course_id' })
    courseId: number;

    @Column({ name: 'start_course', type: 'timestamptz' })
    startCourse: Date;
}
