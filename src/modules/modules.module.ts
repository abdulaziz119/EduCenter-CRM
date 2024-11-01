import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { GroupModule } from './group/group.module';
import { CourseModule } from './course/course.module';
import { TimetableModule } from './timetable/timetable.module';

@Module({
  imports: [
    DatabaseModule,
    TeacherModule,
    StudentModule,
    GroupModule,
    CourseModule,
    TimetableModule,
  ],
})
export class ModulesModule {}
