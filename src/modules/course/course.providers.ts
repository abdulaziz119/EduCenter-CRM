import { EDUCATION_SOURCE, MODELS } from '../../constants';
import { DataSource } from 'typeorm';
import { CourseEntity } from '../../entity/course.entity';

export const courseProviders = [
  {
    provide: MODELS.COURSES,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CourseEntity),
    inject: [EDUCATION_SOURCE],
  },
];
