import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserTestEntity} from "../../course/entities/user_test.entity";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'user_id'
    })
    userId: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 255, nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    password: string;

    @Column({type: 'enum', enum: ['admin', 'user'], default: 'user'})
    role: string;

    @Column({type: 'date', nullable: true})
    dateOfBirth: Date;

    @OneToMany(() => UserTestEntity, userTest => userTest.user)
    userTests: UserTestEntity[];
}
