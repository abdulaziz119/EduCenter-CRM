import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AuthorizationService } from './auth.service';
import { AuthController } from './auth.controller';
import { teacherProviders } from '../teacher/teacher.providers';
import { studentProviders } from '../student/student.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...teacherProviders, ...studentProviders, AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthModule {}
