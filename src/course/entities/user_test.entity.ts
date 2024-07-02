import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TestEntity } from './test.entity';

@Entity('user_test')
export class UserTestEntity {
    @PrimaryColumn({ name: 'user_id' })
    userId: number;

    @PrimaryColumn({ name: 'test_id' })
    testId: number;

    @Column({ name: 'finish_date', type: 'timestamptz', nullable: true })
    finishDate: Date;

    @Column({ type: 'decimal' })
    progress: number;

    @Column({ name: 'is_complete', type: 'boolean' })
    isComplete: boolean;

    @ManyToOne(() => UserEntity, user => user.userTests)
    user: UserEntity;

    @ManyToOne(() => TestEntity, test => test.userTests)
    test: TestEntity;
}
