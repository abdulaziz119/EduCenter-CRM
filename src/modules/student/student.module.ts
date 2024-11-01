import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { studentProviders } from './student.providers';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { groupProviders } from '../group/group.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StudentController],
  providers: [...studentProviders, ...groupProviders, StudentService],
})
export class StudentModule {}
