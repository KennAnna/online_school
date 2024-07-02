import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CourseEntity } from './course.entity';
import { QuestionEntity } from './question.entity';
import { UserTestEntity } from './user_test.entity';
@Entity('test')
export class TestEntity {
    @PrimaryGeneratedColumn({ name: 'test_id' })
    testId: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ name: 'course_id' })
    courseId: number;

    @ManyToOne(() => CourseEntity, course => course.tests)
    course: CourseEntity;

    @OneToMany(() => QuestionEntity, question => question.test)
    questions: QuestionEntity[];

    @OneToMany(() => UserTestEntity, userTest => userTest.test)
    userTests: UserTestEntity[];
}
