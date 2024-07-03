import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'school',
      password: 'school',
      database: 'school',
      synchronize: false,
      entities: ["dist/**/*.entity.js"],
      migrations: ["dist/migrations/*.js"],
      migrationsRun:true
    }),

    AuthModule, UserModule, CourseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

