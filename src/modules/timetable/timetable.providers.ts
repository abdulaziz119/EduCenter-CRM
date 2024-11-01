import { EDUCATION_SOURCE, MODELS } from '../../constants';
import { DataSource } from 'typeorm';
import { GroupEntity } from '../../entity/group.entity';

export const timetableProviders = [
  {
    provide: MODELS.TIMETABLE,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GroupEntity),
    inject: [EDUCATION_SOURCE],
  },
];
