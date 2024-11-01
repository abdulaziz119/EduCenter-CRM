import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { teacherProviders } from './teacher.providers';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { groupProviders } from '../group/group.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TeacherController],
  providers: [...teacherProviders, ...groupProviders, TeacherService],
})
export class TeacherModule {}
