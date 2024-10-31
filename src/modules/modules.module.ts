import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [DatabaseModule, TeacherModule],
})
export class ModulesModule {}
