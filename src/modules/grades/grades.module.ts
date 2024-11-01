import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { gradesProviders } from './grades.providers';
import { GradesController } from './grades.controller';
import { GradesService } from './grades.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GradesController],
  providers: [...gradesProviders, GradesService],
})
export class GradesModule {}
