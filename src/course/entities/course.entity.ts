import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TestEntity} from "./test.entity";
import {VideoEntity} from "./video.entity";
import {UserEntity} from "../../user/entities/user.entity";

@Entity('course')
export class CourseEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'course_id'
    })
    courseId:number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @OneToMany(() => VideoEntity, video => video.course)
    videos: VideoEntity[];

    @OneToMany(() => TestEntity, test => test.course)
    tests: TestEntity[];

    @ManyToMany(() => UserEntity, user => user.courses)
    @JoinTable({name:'user_course'})
    user: UserEntity;
}
