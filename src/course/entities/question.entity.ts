import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { TestEntity } from './test.entity';

@Entity('questions')
export class QuestionEntity {
    @PrimaryGeneratedColumn({ name: 'question_id' })
    questionId: number;

    @Column({ type: 'varchar', length: 255 })
    question: string;

    @OneToMany(() => AnswerEntity, answer => answer.question)
    answers: AnswerEntity[];

    @ManyToOne(() => TestEntity, test => test.questions)
    test: TestEntity;
}
