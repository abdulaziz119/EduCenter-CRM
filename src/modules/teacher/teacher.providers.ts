import { EDUCATION_SOURCE, MODELS } from '../../constants';
import { DataSource } from 'typeorm';
import { TeacherEntity } from '../../entity/teacher.entity';

export const teacherProviders = [
  {
    provide: MODELS.TEACHERS,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TeacherEntity),
    inject: [EDUCATION_SOURCE],
  },
];
