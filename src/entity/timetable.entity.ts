import { Entity, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { BaseEntity } from './base-entity';

@Entity('timetable')
export class TimetableEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  date: Date;

  @Column({ type: 'varchar' })
  startTime: Date;

  @Column({ type: 'varchar' })
  endTime: Date;

  @Column()
  groupId: ObjectId;

  @Column()
  teacherId: ObjectId;

  @Column()
  courseId: ObjectId;
}
