import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { courseProviders } from './course.providers';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [...courseProviders, CourseService],
})
export class CourseModule {}
