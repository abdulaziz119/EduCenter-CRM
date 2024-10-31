import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectId } from 'mongodb';
import { BaseEntity } from './base-entity';

@Entity('timetable')
export class TimetableEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  date: Date;

  @Column({ type: 'varchar' })
  lesson: string;

  @Column()
  groupId: ObjectId;

  @Column()
  teacherId: ObjectId;
}
