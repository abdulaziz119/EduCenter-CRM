import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DB_DB, DB_HOST, DB_PASS, DB_PORT, DB_USER } from '../utils/env';
import { EDUCATION_SOURCE } from '../constants';
import { CourseEntity } from '../entity/course.entity';
import { GroupEntity } from '../entity/group.entity';
import { StudentEntity } from '../entity/student.entity';
import { TeacherEntity } from '../entity/teacher.entity';
import { TimetableEntity } from '../entity/timetable.entity';

export const databaseProviders = [
  {
    provide: EDUCATION_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASS,
        database: DB_DB,
        synchronize: true,
        logging: false,
        entities: [
          CourseEntity,
          GroupEntity,
          StudentEntity,
          TeacherEntity,
          TimetableEntity,
        ],
        // extra: {
        //   timezone: 'UTC',
        // },
      });
      await dataSource.initialize();
      return dataSource;
    },
  },
];
