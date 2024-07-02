import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1719910749146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "role_t" AS ENUM ('admin', 'user');

            CREATE TABLE "user" (
                "user_id" serial NOT NULL,
                "name" varchar(255),
                "email" varchar(255),
                "password" varchar(255),
                "role" role_t,
                "date_birth" date,
                PRIMARY KEY ("user_id")
            );

            CREATE TABLE "course" (
                "course_id" serial NOT NULL,
                "title" varchar(255) NOT NULL,
                "description" text NOT NULL,
                PRIMARY KEY ("course_id")
            );

            CREATE TABLE "video" (
                "video_id" serial NOT NULL,
                "video_time" varchar(255),
                "video_path" varchar(255),
                "course_id" int,
                PRIMARY KEY ("video_id"),
                FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            CREATE TABLE "user_course" (
                "user_id" int,
                "course_id" int,
                "start_course" TIMESTAMPTZ,
                PRIMARY KEY ("user_id", "course_id"),
                FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON UPDATE NO ACTION ON DELETE NO ACTION,
                FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            CREATE TABLE "test" (
                "test_id" serial NOT NULL,
                "title" varchar(255),
                "description" text,
                "course_id" int,
                "complete_count" int,
                PRIMARY KEY ("test_id"),
                FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            CREATE TABLE "questions" (
                "question_id" serial NOT NULL,
                "question" varchar(255),
                "test_id" int,
                PRIMARY KEY ("question_id"),
                FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            CREATE TABLE "answer" (
                "answer_id" serial NOT NULL,
                "answer" text,
                "question_id" int,
                "is_correct" boolean,
                PRIMARY KEY ("answer_id"),
                FOREIGN KEY ("question_id") REFERENCES "questions"("question_id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );

            CREATE TABLE "user_test" (
                "user_id" int,
                "test_id" int,
                "finish_date" TIMESTAMPTZ,
                "progress" decimal,
                "is_complete" boolean,
                PRIMARY KEY ("user_id", "test_id"),
                FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON UPDATE NO ACTION ON DELETE NO ACTION,
                FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON UPDATE NO ACTION ON DELETE NO ACTION
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
