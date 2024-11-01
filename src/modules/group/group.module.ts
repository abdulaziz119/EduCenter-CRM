import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { groupProviders } from './group.providers';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [...groupProviders, GroupService],
})
export class GroupModule {}
