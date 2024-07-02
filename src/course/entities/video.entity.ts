import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity('video')
export class VideoEntity {
    @PrimaryGeneratedColumn({ name: 'video_id' })
    videoId: number;

    @Column({ name: 'video_time', type: 'varchar', length: 255 })
    videoTime: string;

    @Column({ name: 'video_path', type: 'varchar', length: 255 })
    videoPath: string;

    @Column({ name: 'course_id' })
    courseId: number;

    @ManyToOne(() => CourseEntity, course => course.videos)
    course: CourseEntity;
}
