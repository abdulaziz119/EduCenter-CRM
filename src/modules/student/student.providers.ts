import { EDUCATION_SOURCE, MODELS } from '../../constants';
import { DataSource } from 'typeorm';
import { StudentEntity } from '../../entity/student.entity';

export const studentProviders = [
  {
    provide: MODELS.STUDENTS,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StudentEntity),
    inject: [EDUCATION_SOURCE],
  },
];
