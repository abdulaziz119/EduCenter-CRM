import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { timetableProviders } from './timetable.providers';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TimetableController],
  providers: [...timetableProviders, TimetableService],
})
export class TimetableModule {}
