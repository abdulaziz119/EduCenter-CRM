import { EDUCATION_SOURCE, MODELS } from '../../constants';
import { DataSource } from 'typeorm';
import { GradesEntity } from '../../entity/grades.entity';

export const gradesProviders = [
  {
    provide: MODELS.GRADES,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GradesEntity),
    inject: [EDUCATION_SOURCE],
  },
];
