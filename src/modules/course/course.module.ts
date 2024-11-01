import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { courseProviders } from './course.providers';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { groupProviders } from '../group/group.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [...courseProviders, ...groupProviders, CourseService],
})
export class CourseModule {}
