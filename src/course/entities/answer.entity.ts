import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity('answer')
export class AnswerEntity {
    @PrimaryGeneratedColumn({ name: 'answer_id' })
    answerId: number;

    @Column({ type: 'text' })
    answer: string;

    @Column({ type: 'boolean' })
    isCorrect: boolean;

    @ManyToOne(() => QuestionEntity, question => question.answers)
    question: QuestionEntity;
}
