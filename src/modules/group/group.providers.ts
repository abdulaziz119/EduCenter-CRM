import { EDUCATION_SOURCE, MODELS } from '../../constants';
import { DataSource } from 'typeorm';
import { GroupEntity } from '../../entity/group.entity';

export const groupProviders = [
  {
    provide: MODELS.GROUPS,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GroupEntity),
    inject: [EDUCATION_SOURCE],
  },
];
